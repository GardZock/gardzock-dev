import React, { useState, useMemo, CSSProperties } from "react";
import { useT } from "next-i18next/client";

type StatusKey = "prep" | "andamento" | "concluido";

interface Task {
  id: string;
  title: string;
  priority: "P0" | "P1" | "P2";
  initials: string;
  avatarColor: string;
}

interface ColumnConfig {
  key: StatusKey;
  title: string;
  color: string;
  emptyLabel: string;
  tasks: Task[];
}

const colors = {
  bg: "#0D1117",
  bgColumn: "#161B22",
  bgSearch: "#010409",
  border: "#30363D",
  borderMuted: "#21262D",
  text: "#C9D1D9",
  textMuted: "#8B949E",
  textFaint: "#6E7681",
  accentTab: "#F78166",
  accentSelected: "#1F6FEB",
  priorityText: "#F85149",
  priorityBorder: "#F8514966",
  priorityBg: "#F8514926",
};

function StatusIcon({ status, color }: { status: StatusKey; color: string }) {
  if (status === "prep") {
    return (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.25" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  }
  if (status === "andamento") {
    return (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.25" stroke={color} strokeWidth="1.5" />
        <path d="M8 8 L8 1.75 A6.25 6.25 0 0 1 8 8Z" fill={color} />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.25" fill={color} />
      <path
        d="M5 8.2L7 10.2L11 6"
        stroke="#0D1117"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MiniGithubKanban() {
  const { t } = useT("portfolio");
  const [selected, setSelected] = useState<Task | null>(null);
  const [addingIn, setAddingIn] = useState<StatusKey | null>(null);

  const columns: ColumnConfig[] = useMemo(() => [
    {
      key: "prep",
      title: t("MINI_GITHUB.COL_PREP"),
      color: "#9198A1",
      emptyLabel: t("MINI_GITHUB.EMPTY_PREP"),
      tasks: [
        {
          id: "Board #4",
          title: t("MINI_GITHUB.TASK_1"),
          priority: "P1",
          initials: "MC",
          avatarColor: "#3B82F6",
        },
        {
          id: "Board #5",
          title: t("MINI_GITHUB.TASK_2"),
          priority: "P2",
          initials: "RS",
          avatarColor: "#F97316",
        },
      ],
    },
    {
      key: "andamento",
      title: t("MINI_GITHUB.COL_IN_PROGRESS"),
      color: "#D29922",
      emptyLabel: t("MINI_GITHUB.EMPTY_IN_PROGRESS"),
      tasks: [],
    },
    {
      key: "concluido",
      title: t("MINI_GITHUB.COL_DONE"),
      color: "#3FB950",
      emptyLabel: t("MINI_GITHUB.EMPTY_DONE"),
      tasks: [
        {
          id: "Board #1",
          title: t("MINI_GITHUB.TASK_3"),
          priority: "P0",
          initials: "AL",
          avatarColor: "#A371F7",
        },
      ],
    },
  ], [t]);

  const root: CSSProperties = {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    borderRadius: 6,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    padding: 12,
    overflow: "hidden",
    userSelect: "none",
  };

  const topBar: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    flexShrink: 0,
  };

  const tabs: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderBottom: `1px solid ${colors.borderMuted}`,
    marginBottom: 8,
    paddingBottom: 6,
    flexShrink: 0,
  };

  const searchBar: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 6,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bgSearch,
    padding: "5px 8px",
    marginBottom: 8,
    flexShrink: 0,
  };

  const columnsWrap: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    flex: 1,
    minHeight: 0,
  };

  const columnStyle: CSSProperties = {
    borderRadius: 6,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bgColumn,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    overflow: "hidden",
  };

  const columnHeader: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 6px",
    borderBottom: `1px solid ${colors.borderMuted}`,
    flexShrink: 0,
  };

  const columnBody: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    padding: 6,
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
  };

  const statusBar: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 6,
    borderTop: `1px solid ${colors.borderMuted}`,
    fontSize: 10,
    color: colors.textFaint,
    flexShrink: 0,
  };

  return (
    <div style={root}>
      <div style={topBar}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill={colors.textMuted}
          >
            <path d="M4 6V4a4 4 0 1 1 8 0v2h.25A1.75 1.75 0 0 1 14 7.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5A1.75 1.75 0 0 1 3.75 6H4Zm1.5-2v2h5V4a2.5 2.5 0 0 0-5 0Z" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>
            Board
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill={colors.textMuted}>
          <circle cx="3" cy="8" r="1.3" />
          <circle cx="8" cy="8" r="1.3" />
          <circle cx="13" cy="8" r="1.3" />
        </svg>
      </div>

      <div style={tabs}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: colors.text,
            paddingBottom: 6,
            borderBottom: `2px solid ${colors.accentTab}`,
          }}
        >
          {t("MINI_GITHUB.VIEW_OVERVIEW")}
        </span>
        <span style={{ fontSize: 11, color: colors.textMuted }}>
          {t("MINI_GITHUB.VIEW_PRIORITY")}
        </span>
        <span style={{ fontSize: 11, color: colors.textMuted }}>{t("MINI_GITHUB.NEW")}</span>
      </div>

      <div style={searchBar}>
        <svg width="11" height="11" viewBox="0 0 16 16" fill={colors.textMuted}>
          <path d="M15.7 13.3l-3.6-3.6a5.5 5.5 0 1 0-1 1l3.6 3.6a.7.7 0 0 0 1-1ZM2.5 6.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
        </svg>
        <span style={{ fontSize: 10.5, color: colors.textFaint }}>
          {t("MINI_GITHUB.FILTER_PLACEHOLDER")}
        </span>
      </div>

      <div style={columnsWrap}>
        {columns.map((col) => (
          <div key={col.key} style={columnStyle}>
            <div style={columnHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <StatusIcon status={col.key} color={col.color} />
                <span
                  style={{ fontSize: 10.5, fontWeight: 600, color: col.color }}
                >
                  {col.title}
                </span>
                <span style={{ fontSize: 9.5, color: colors.textFaint }}>
                  {col.tasks.length}
                </span>
              </div>
              <button
                onClick={() =>
                  setAddingIn(addingIn === col.key ? null : col.key)
                }
                style={{
                  fontSize: 13,
                  lineHeight: 1,
                  borderRadius: 4,
                  padding: "0 4px",
                  color: colors.textMuted,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>

            <div style={columnBody}>
              {col.tasks.length === 0 && addingIn !== col.key && (
                <span
                  style={{
                    fontSize: 9.5,
                    lineHeight: 1.4,
                    color: colors.textFaint,
                  }}
                >
                  {col.emptyLabel}
                </span>
              )}

              {col.tasks.map((task) => {
                const isSelected = selected?.id === task.id;
                return (
                  <button
                    key={task.id}
                    onClick={() => setSelected(isSelected ? null : task)}
                    style={{
                      textAlign: "left",
                      borderRadius: 6,
                      border: `1px solid ${isSelected ? colors.accentSelected : colors.border}`,
                      backgroundColor: isSelected ? "#1C2128" : colors.bg,
                      padding: 8,
                      cursor: "pointer",
                      transition: "border-color 0.15s, background-color 0.15s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <StatusIcon status={col.key} color={col.color} />
                        <span style={{ fontSize: 9, color: colors.textFaint }}>
                          {task.id}
                        </span>
                      </div>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 7,
                          fontWeight: 700,
                          color: "#fff",
                          flexShrink: 0,
                          backgroundColor: task.avatarColor,
                        }}
                      >
                        {task.initials}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 10.5,
                        fontWeight: 500,
                        lineHeight: 1.35,
                        marginTop: 4,
                        color: colors.text,
                      }}
                    >
                      {task.title}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        padding: "1px 6px",
                        borderRadius: 999,
                        fontSize: 8.5,
                        fontWeight: 600,
                        color: colors.priorityText,
                        border: `1px solid ${colors.priorityBorder}`,
                        backgroundColor: colors.priorityBg,
                      }}
                    >
                      {task.priority}
                    </span>
                  </button>
                );
              })}

              {addingIn === col.key && (
                <div
                  style={{
                    borderRadius: 6,
                    border: `1px dashed ${colors.border}`,
                    padding: 8,
                    fontSize: 9.5,
                    color: colors.textFaint,
                  }}
                >
                  {t("MINI_GITHUB.ADD_ITEM")}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={statusBar}>
        <span>
          {selected
            ? `${selected.id} ${t("MINI_GITHUB.SELECTED")}`
            : t("MINI_GITHUB.SELECT_DETAILS")}
        </span>
        <span>{columns.reduce((acc, c) => acc + c.tasks.length, 0)} {t("MINI_GITHUB.ITEMS_COUNT")}</span>
      </div>
    </div>
  );
}
