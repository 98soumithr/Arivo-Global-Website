'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { NavItem } from '@/content/site';
import { buttonClass } from '@/components/ui/Button';
import { Chevron } from '@/components/ui/Arrow';
import { Wordmark } from './Wordmark';

export interface MobileGroup {
  label: string;
  href: string;
  children: { label: string; href: string }[];
}

interface HeaderProps {
  nav: NavItem[];
  /** Category accordions for the drawer: each category with its products. */
  mobileProducts: MobileGroup[];
  quoteHref: string;
}

/**
 * 72px, white, 1px bottom border. Does not shrink, hide or blur on scroll.
 * Dropdowns: top-level items are real links; a separate toggle opens the panel from the keyboard;
 * Escape closes. State is keyed to the pathname, so a route change closes everything.
 */
export function Header({ nav, mobileProducts, quoteHref }: HeaderProps) {
  const pathname = usePathname();
  const [menu, setMenu] = useState<{ label: string; path: string } | null>(null);
  const [drawerPath, setDrawerPath] = useState<string | null>(null);
  const openMenu = menu?.path === pathname ? menu.label : null;
  const drawerOpen = drawerPath === pathname;
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(null);
        navRef.current?.querySelector<HTMLButtonElement>(`[data-toggle="${openMenu}"]`)?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  return (
    <header className="relative z-40 h-(--header-h) border-b border-border bg-white">
      <div className="mx-auto flex h-full w-full max-w-[calc(var(--container-page)_+_2*var(--gutter))] items-center px-(--gutter)">
        <Link href="/" className="shrink-0">
          <Wordmark />
          <span className="sr-only"> — home</span>
        </Link>

        <nav ref={navRef} aria-label="Main" className="ml-12 hidden h-full lg:block">
          <ul className="flex h-full items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isOpen = openMenu === item.label;
              const panelId = `nav-panel-${item.label.toLowerCase()}`;
              return (
                <li
                  key={item.label}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => item.children && setMenu({ label: item.label, path: pathname })}
                  onMouseLeave={() => item.children && setMenu(null)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex h-full items-center px-3 text-[15px] font-medium text-navy decoration-1 underline-offset-[6px] transition-[text-decoration-thickness] duration-150 hover:underline ${active ? 'underline decoration-2' : ''}`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <>
                      <button
                        type="button"
                        data-toggle={item.label}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        aria-label={`${item.label} menu`}
                        onClick={() => setMenu(isOpen ? null : { label: item.label, path: pathname })}
                        className="-ml-2 flex size-7 items-center justify-center rounded-brand text-slate hover:text-navy"
                      >
                        <Chevron className={`size-3.5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div
                        id={panelId}
                        hidden={!isOpen}
                        className="absolute top-full left-0 w-[400px] border border-border bg-white p-2"
                      >
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="group block rounded-brand px-4 py-3 hover:bg-paper"
                                onClick={() => setMenu(null)}
                              >
                                <span className="block text-[15px] font-semibold text-navy group-hover:underline group-hover:underline-offset-4">
                                  {child.label}
                                </span>
                                {child.description && <span className="t-small mt-0.5 block text-slate">{child.description}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:block">
            <Link href={quoteHref} className={buttonClass('primary', '!min-h-11 !px-5 !py-2.5')}>
              Request a quote
            </Link>
          </span>
          <button
            type="button"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerPath(pathname)}
            className="flex h-11 items-center gap-2 rounded-brand border border-border px-3.5 text-[15px] font-medium text-navy lg:hidden"
          >
            <svg aria-hidden viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
            Menu
          </button>
        </div>
      </div>

      {drawerOpen && (
        <MobileDrawer nav={nav} mobileProducts={mobileProducts} quoteHref={quoteHref} onClose={() => setDrawerPath(null)} />
      )}
    </header>
  );
}

function MobileDrawer({
  nav,
  mobileProducts,
  quoteHref,
  onClose,
}: Omit<HeaderProps, never> & { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const trap = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const focusables = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('button, a[href]')?.focus();
    document.addEventListener('keydown', trap);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', trap);
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, [trap]);

  const rest = nav.filter((n) => n.href !== '/products');

  return (
    <div
      id="mobile-drawer"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
    >
      <div className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-border px-(--gutter)">
        <Wordmark />
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 items-center gap-2 rounded-brand border border-border px-3.5 text-[15px] font-medium text-navy"
        >
          <svg aria-hidden viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m5 5 10 10M15 5 5 15" />
          </svg>
          Close
        </button>
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-(--gutter) py-4">
        <p className="t-label py-3 text-slate">Products</p>
        <ul className="border-t border-border">
          {mobileProducts.map((group) => {
            const open = expanded === group.label;
            const id = `drawer-${group.href.split('/').pop()}`;
            return (
              <li key={group.label} className="border-b border-border">
                <div className="flex items-center">
                  <Link href={group.href} onClick={onClose} className="flex-1 py-4 text-[17px] font-semibold text-navy">
                    {group.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={id}
                    aria-label={`${group.label} products`}
                    onClick={() => setExpanded(open ? null : group.label)}
                    className="flex size-11 items-center justify-center text-harbour"
                  >
                    <Chevron className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <ul id={id} hidden={!open} className="pb-3">
                  {group.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={onClose} className="block py-2.5 pl-4 text-[16px] text-ink">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
          <li className="border-b border-border">
            <Link href="/products" onClick={onClose} className="block py-4 text-[16px] text-harbour">
              All products
            </Link>
          </li>
        </ul>
        <ul className="mt-6 border-t border-border">
          {rest.map((item) => (
            <li key={item.href} className="border-b border-border">
              <Link href={item.href} onClick={onClose} className="block py-4 text-[17px] font-semibold text-navy">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-border bg-white p-(--gutter)">
        <Link href={quoteHref} onClick={onClose} className={buttonClass('primary', 'w-full')}>
          Request a quote
        </Link>
      </div>
    </div>
  );
}
