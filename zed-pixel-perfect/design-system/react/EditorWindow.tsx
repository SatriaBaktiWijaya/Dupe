import React from 'react';

export interface EditorTabItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

export interface EditorWindowProps {
  filePath?: string;
  tabs?: EditorTabItem[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  lines?: number;
  activeLine?: number;
  statusInfo?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const EditorWindow: React.FC<EditorWindowProps> = ({
  filePath = 'src/main.rs',
  tabs = [],
  activeTabId,
  onTabChange,
  lines = 10,
  activeLine = 1,
  statusInfo,
  children,
  className = '',
}) => {
  return (
    <div className={`zen-editor-window ${className}`.trim()}>
      {/* Titlebar */}
      <div className="zen-editor-titlebar">
        <div className="zen-traffic-lights">
          <span className="zen-light-close" />
          <span className="zen-light-minimize" />
          <span className="zen-light-maximize" />
        </div>
        <div className="text-xs text-[var(--text-muted)] font-mono">{filePath}</div>
        <div />
      </div>

      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="zen-editor-tabs">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange?.(tab.id)}
                className={`zen-editor-tab ${isActive ? 'active' : ''}`}
              >
                {tab.icon && <span>{tab.icon}</span>}
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Code Body */}
      <div className="zen-editor-body">
        {lines > 0 && (
          <div className="zen-editor-gutter">
            {Array.from({ length: lines }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={num === activeLine ? 'active-line' : undefined}
              >
                {num}
              </div>
            ))}
          </div>
        )}
        <div className="zen-editor-code">{children}</div>
      </div>

      {/* Statusbar */}
      {statusInfo && <div className="zen-editor-statusbar">{statusInfo}</div>}
    </div>
  );
};

export default EditorWindow;

