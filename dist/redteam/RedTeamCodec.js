// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { RedTeamExecutionCodec } from './RedTeamExecutionCodec.js';
import { RedTeamInput } from './RedTeamInput.js';
import { RedTeamRequestCodec } from './RedTeamRequestCodec.js';
import { RedTeamReportCodec } from './RedTeamReportCodec.js';
import { RedTeamLimits, RedTeamStatus, RedTeamAgentStatus, RedTeamTaskStatus, RedTeamFindingStatus, RedTeamSeverity, RedTeamCoordinationKind, } from './RedTeamTypes.js';
/** Decodes bounded owner-scoped metadata; chat journals carry verbose agent output. */
export class RedTeamCodec {
    /** Decode bounded effort metadata and exact counters without accepting unknown fields. */
    static effort(raw) {
        const value = RedTeamInput.record(raw, [
            'effortId',
            'title',
            'source',
            'rules',
            'parallelism',
            'status',
            'revision',
            'createdAtMs',
            'updatedAtMs',
            'sessionKey',
            'taskCount',
            'findingCount',
            'error',
        ]);
        const createdAtMs = RedTeamInput.decimal(value['createdAtMs']);
        const updatedAtMs = RedTeamInput.decimal(value['updatedAtMs']);
        if (BigInt(updatedAtMs) < BigInt(createdAtMs)) {
            throw new RangeError('Red team time moved backwards');
        }
        return {
            effortId: RedTeamInput.id(value['effortId']),
            title: RedTeamInput.text(value['title'], 256),
            source: RedTeamRequestCodec.source(value['source']),
            rules: RedTeamInput.text(value['rules'], RedTeamLimits.rulesCharacters),
            parallelism: RedTeamInput.integer(value['parallelism'], 1, RedTeamLimits.maxParallelism),
            status: RedTeamInput.choice(value['status'], RedTeamStatus),
            revision: RedTeamInput.decimal(value['revision']),
            createdAtMs,
            updatedAtMs,
            sessionKey: RedTeamInput.id(value['sessionKey']),
            taskCount: RedTeamInput.decimal(value['taskCount']),
            findingCount: RedTeamInput.decimal(value['findingCount']),
            error: value['error'] === null ? null : RedTeamInput.text(value['error'], 4096),
        };
    }
    /** Decode one worker and its saved Chat session reference. */
    static agent(raw) {
        const value = RedTeamInput.record(raw, ['agentId', 'sessionKey', 'status', 'taskId', 'activity'], ['name', 'historySelection']);
        return {
            ...(Object.hasOwn(value, 'historySelection')
                ? {
                    historySelection: RedTeamExecutionCodec.historySelection(value['historySelection']),
                }
                : {}),
            agentId: RedTeamInput.id(value['agentId']),
            ...(Object.hasOwn(value, 'name')
                ? { name: RedTeamInput.text(value['name'], 256) }
                : {}),
            sessionKey: this.#nullableId(value['sessionKey']),
            status: RedTeamInput.choice(value['status'], RedTeamAgentStatus),
            taskId: this.#nullableId(value['taskId']),
            activity: RedTeamInput.text(value['activity'], 4096, true),
        };
    }
    /** Native worker identities and selectors are instance identities, never persona aliases. */
    static delegatedAgent(raw) {
        const value = RedTeamInput.record(raw, [
            'agentId',
            'sessionKey',
            'status',
            'taskId',
            'activity',
            'parentAgentId',
            'historySelection',
            'goal',
        ], ['name']);
        const { parentAgentId: rawParent, goal: rawGoal, ...fields } = value;
        const agent = this.agent(fields);
        const historySelection = RedTeamExecutionCodec.historySelection(value['historySelection']);
        const parentAgentId = RedTeamInput.id(rawParent);
        if (agent.agentId !== `native:${historySelection.workerId}` ||
            agent.sessionKey === null ||
            parentAgentId === agent.agentId) {
            throw new TypeError('Native worker requires its original archive and distinct actual parent');
        }
        return {
            ...agent,
            parentAgentId,
            historySelection,
            goal: RedTeamInput.text(rawGoal, 8192),
        };
    }
    /** Validate one real exchange without treating a paged-out ledger record as missing. */
    static coordination(raw) {
        const value = RedTeamInput.record(raw, ['eventId', 'sequence', 'atMs', 'kind', 'agentId', 'taskId', 'findingId', 'summary'], ['action']);
        return {
            eventId: RedTeamInput.id(value['eventId']),
            sequence: RedTeamInput.decimal(value['sequence']),
            atMs: RedTeamInput.decimal(value['atMs']),
            kind: RedTeamInput.choice(value['kind'], RedTeamCoordinationKind),
            agentId: RedTeamInput.id(value['agentId']),
            taskId: this.#nullableId(value['taskId']),
            findingId: this.#nullableId(value['findingId']),
            summary: RedTeamInput.text(value['summary'], 4096),
            ...(Object.hasOwn(value, 'action')
                ? { action: RedTeamExecutionCodec.action(value['action']) }
                : {}),
        };
    }
    /** Decode a task whose execution state remains owned by the durable runtime. */
    static task(raw) {
        const value = RedTeamInput.record(raw, [
            'taskId',
            'title',
            'description',
            'status',
            'agentId',
            'updatedAtMs',
        ]);
        return {
            taskId: RedTeamInput.id(value['taskId']),
            title: RedTeamInput.text(value['title'], 256),
            description: RedTeamInput.text(value['description'], 16_384, true),
            status: RedTeamInput.choice(value['status'], RedTeamTaskStatus),
            agentId: this.#nullableId(value['agentId']),
            updatedAtMs: RedTeamInput.decimal(value['updatedAtMs']),
        };
    }
    /** Decode a bounded observation and optional retained artifact reference. */
    static evidence(raw) {
        const value = RedTeamInput.record(raw, ['fileId', 'description'], ['agentId']);
        return {
            ...(Object.hasOwn(value, 'agentId')
                ? { agentId: this.#nullableId(value['agentId']) }
                : {}),
            fileId: this.#nullableId(value['fileId']),
            description: RedTeamInput.text(value['description'], 4096),
        };
    }
    /** Decode a complete candidate or observed verdict without inventing report metadata. */
    static finding(raw) {
        const value = RedTeamInput.record(raw, [
            'findingId',
            'title',
            'severity',
            'status',
            'cvssScore',
            'description',
            'affectedComponent',
            'agentId',
            'evidence',
            'reproduction',
            'updatedAtMs',
        ], ['report']);
        const cvssScore = value['cvssScore'];
        if (cvssScore !== null &&
            (typeof cvssScore !== 'string' ||
                !/^(?:[0-9](?:\.[0-9])?|10(?:\.0)?)$/u.test(cvssScore))) {
            throw new RangeError('Invalid CVSS score');
        }
        return {
            findingId: RedTeamInput.id(value['findingId']),
            title: RedTeamInput.text(value['title'], 256),
            severity: RedTeamInput.choice(value['severity'], RedTeamSeverity),
            status: RedTeamInput.choice(value['status'], RedTeamFindingStatus),
            cvssScore,
            description: RedTeamInput.text(value['description'], 16_384),
            affectedComponent: RedTeamInput.text(value['affectedComponent'], 1024),
            agentId: this.#nullableId(value['agentId']),
            evidence: RedTeamInput.list(value['evidence'], 64, (item) => this.evidence(item)),
            reproduction: RedTeamInput.list(value['reproduction'], 100, (item) => RedTeamInput.text(item, 4096)),
            updatedAtMs: RedTeamInput.decimal(value['updatedAtMs']),
            ...(Object.hasOwn(value, 'report')
                ? { report: RedTeamReportCodec.parse(value['report']) }
                : {}),
        };
    }
    /** Validate a bounded revision page, known worker references and ordered coordination events. */
    static snapshot(raw) {
        const value = RedTeamInput.record(raw, ['effort', 'agents', 'tasks', 'findings', 'nextTaskCursor', 'nextFindingCursor'], ['coordination', 'delegatedAgents']);
        const effort = this.effort(value['effort']);
        const agents = RedTeamInput.list(value['agents'], RedTeamLimits.maxParallelism, (item) => this.agent(item));
        const delegatedAgents = Object.hasOwn(value, 'delegatedAgents')
            ? RedTeamInput.list(value['delegatedAgents'], RedTeamLimits.maxDelegatedAgents, (item) => this.delegatedAgent(item))
            : undefined;
        const tasks = RedTeamInput.list(value['tasks'], RedTeamLimits.pageSize, (item) => this.task(item));
        const findings = RedTeamInput.list(value['findings'], RedTeamLimits.pageSize, (item) => this.finding(item));
        RedTeamInput.unique([...agents, ...(delegatedAgents ?? [])].map((item) => item.agentId));
        RedTeamInput.unique(tasks.map((item) => item.taskId));
        RedTeamInput.unique(findings.map((item) => item.findingId));
        const coordination = Object.hasOwn(value, 'coordination')
            ? RedTeamInput.list(value['coordination'], RedTeamLimits.pageSize, (item) => this.coordination(item))
            : undefined;
        if (coordination !== undefined) {
            RedTeamInput.unique(coordination.map((item) => item.eventId));
            const agentIds = new Set([
                'orchestrator',
                ...agents.map((item) => item.agentId),
                ...(delegatedAgents ?? []).map((item) => item.agentId),
            ]);
            let previous = -1n;
            for (const event of coordination) {
                const delegated = delegatedAgents?.find((agent) => agent.agentId === event.agentId);
                const expectedSelection = delegated?.historySelection;
                const selection = event.action?.target.historySelection;
                const sequence = BigInt(event.sequence);
                if (sequence <= previous || !agentIds.has(event.agentId)) {
                    throw new TypeError('Coordination requires increasing sequences and a known agent');
                }
                if (event.action &&
                    (event.action.effortId !== effort.effortId ||
                        event.action.agentId !== event.agentId ||
                        event.action.parentAgentId !==
                            (delegated?.parentAgentId ??
                                (event.agentId === 'orchestrator' ? null : 'orchestrator')) ||
                        selection?.workerId !== expectedSelection?.workerId ||
                        selection?.streamId !== expectedSelection?.streamId ||
                        event.action.target.sessionKey !==
                            (event.agentId === 'orchestrator'
                                ? effort.sessionKey
                                : (delegated?.sessionKey ??
                                    agents.find((agent) => agent.agentId === event.agentId)?.sessionKey)))) {
                    throw new TypeError('Execution action belongs to another effort, agent, or session');
                }
                previous = sequence;
            }
        }
        const nextTaskCursor = this.#nullableId(value['nextTaskCursor']);
        const nextFindingCursor = this.#nullableId(value['nextFindingCursor']);
        if (BigInt(tasks.length) > BigInt(effort.taskCount) ||
            BigInt(findings.length) > BigInt(effort.findingCount) ||
            (tasks.length === 0 && nextTaskCursor !== null) ||
            (findings.length === 0 && nextFindingCursor !== null)) {
            throw new TypeError('Inconsistent red team ledger page');
        }
        return {
            effort,
            agents,
            tasks,
            findings,
            nextTaskCursor,
            nextFindingCursor,
            ...(coordination === undefined ? {} : { coordination }),
            ...(delegatedAgents === undefined ? {} : { delegatedAgents }),
        };
    }
    /** Decode one bounded owner-scoped effort directory page. */
    static list(raw) {
        const value = RedTeamInput.record(raw, [
            'items',
            'next',
        ]);
        const items = RedTeamInput.list(value['items'], RedTeamLimits.pageSize, (item) => this.effort(item));
        RedTeamInput.unique(items.map((item) => item.effortId));
        const next = this.#nullableId(value['next']);
        if (items.length === 0 && next !== null) {
            throw new TypeError('Empty red team continuation');
        }
        return { items, next };
    }
    /** Duplicate and delayed snapshots cannot roll a rendered effort backwards. */
    static advance(previous, raw) {
        const next = this.snapshot(raw);
        if (previous === undefined) {
            return next;
        }
        if (previous.effort.effortId !== next.effort.effortId ||
            previous.effort.sessionKey !== next.effort.sessionKey) {
            throw new TypeError('Red team effort identity changed');
        }
        return BigInt(next.effort.revision) > BigInt(previous.effort.revision) ? next : previous;
    }
    static #nullableId(raw) {
        return raw === null ? null : RedTeamInput.id(raw);
    }
}
