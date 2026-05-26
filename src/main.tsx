import { StrictMode } from 'react'
import { createPortal } from 'react-dom'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App, { Frontend, MasterProvider, type ThemeSectionContext } from './App.tsx'
import './css/app.scss'

function parseLiquidContext<T>(raw: string | null): T | undefined {
  if (!raw) return undefined;

  try {
    return JSON.parse(raw) as T;
  } catch {
    // Defensive decode for contexts that arrive HTML-entity escaped.
    const decoded = raw
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    try {
      return JSON.parse(decoded) as T;
    } catch {
      console.error('[zuz-theme] Invalid data-context payload on <zuz-theme-root>.');
      return undefined;
    }
  }
}

class ZuzTheme extends HTMLElement {
  connectedCallback() {
    // Custom elements are inline by default; make section roots layout predictably.
    this.style.display = 'block';

    const rawContext = this.getAttribute('data-context');

    const liquidData = parseLiquidContext<ThemeSectionContext>(
      rawContext
    );

    // Expose a stable, inspectable root marker in Shopify portal mode.
    this.classList.add('--app-root');
    this.setAttribute('data-app-root', 'true');
    this.setAttribute('data-section-type', liquidData?.section_type ?? 'unknown');

    // Consume bootstrap payload once so it is not retained in live DOM.
    this.removeAttribute('data-context');

    sectionRegistry.set(this, liquidData);
    renderMasterSections();
  }

  disconnectedCallback() {
    sectionRegistry.delete(this);
    renderMasterSections();
  }

}

const MASTER_ROOT_ID = 'zuz-theme-master-root';
const sectionRegistry = new Map<HTMLElement, ThemeSectionContext | undefined>();
const portalKeys = new WeakMap<HTMLElement, string>();
let portalCounter = 0;
let masterRoot: Root | null = null;

function getPortalKey(host: HTMLElement): string {
  const existing = portalKeys.get(host);
  if (existing) return existing;

  portalCounter += 1;
  const next = `zuz-theme-portal-${portalCounter}`;
  portalKeys.set(host, next);
  return next;
}

function ensureMasterRoot(): Root {
  if (masterRoot) return masterRoot;

  let mountNode = document.getElementById(MASTER_ROOT_ID);
  if (!mountNode) {
    mountNode = document.createElement('div');
    mountNode.id = MASTER_ROOT_ID;
    mountNode.style.display = 'none';
    document.body.appendChild(mountNode);
  }

  masterRoot = createRoot(mountNode);
  return masterRoot;
}

function renderMasterSections() {
  const root = ensureMasterRoot();
  const portals = Array.from(sectionRegistry.entries()).map(([host, context]) =>
    createPortal(<Frontend context={context} />, host, getPortalKey(host))
  );

  root.render(
    <StrictMode>
      <MasterProvider>{portals}</MasterProvider>
    </StrictMode>
  );
}

// 4. Register the tag with the browser engine
if (!customElements.get('zuz-theme-root')) {
  customElements.define('zuz-theme-root', ZuzTheme);
}

const localRoot = document.getElementById('root');

if (localRoot && localRoot.childElementCount === 0 && sectionRegistry.size === 0) {
  createRoot(localRoot).render(
    <StrictMode>
        <App />
    </StrictMode>
  );
}