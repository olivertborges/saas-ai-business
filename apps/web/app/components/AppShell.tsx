import type { ReactNode } from 'react';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Topbar />

        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
