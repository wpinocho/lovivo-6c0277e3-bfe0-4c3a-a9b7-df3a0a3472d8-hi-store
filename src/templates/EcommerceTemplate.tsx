import { ReactNode, useState } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartUISafe } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { ScrollLink } from '@/components/ScrollLink'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * Atelier Roma — streetwear aesthetic inspired by Unik Clothing
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
  hideFloatingCartOnMobile?: boolean
}

const ANNOUNCEMENT_MESSAGES = [
  'NUEVA COLECCIÓN DISPONIBLE',
  '·',
  'ENVÍO GRATIS EN PEDIDOS +$999 MXN',
  '·',
  'ATELIER ROMA — PLAYERAS · SUDADERAS · GORRAS',
  '·',
  'DEVOLUCIONES GRATIS EN 30 DÍAS',
  '·',
  'NUEVA COLECCIÓN DISPONIBLE',
  '·',
  'ENVÍO GRATIS EN PEDIDOS +$999 MXN',
  '·',
  'ATELIER ROMA — PLAYERAS · SUDADERAS · GORRAS',
  '·',
  'DEVOLUCIONES GRATIS EN 30 DÍAS',
  '·',
]

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default',
  hideFloatingCartOnMobile = false
}: EcommerceTemplateProps) => {
  const cartUI = useCartUISafe()
  const openCart = cartUI?.openCart ?? (() => {})
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { collections, loading: loadingCollections } = useCollections()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    ...(!loadingCollections && collections.length > 0
      ? collections.slice(0, 4).map(c => ({ label: c.name.toUpperCase(), href: `/#collections` }))
      : [
          { label: 'PLAYERAS', href: '/#products' },
          { label: 'SUDADERAS', href: '/#products' },
          { label: 'GORRAS', href: '/#products' },
        ]),
    { label: 'TODO', href: '/#products' },
  ]

  const header = (
    <div className={headerClassName}>
      {/* Announcement Bar */}
      <div className="bg-foreground text-background py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {ANNOUNCEMENT_MESSAGES.map((msg, i) => (
            <span key={i} className="mx-6 text-[11px] uppercase tracking-[0.2em] font-medium">
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo */}
            <div className="flex-1 md:flex-none">
              <BrandLogoLeft />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.label}
                  to={link.href}
                  className="text-xs font-semibold tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors uppercase"
                >
                  {link.label}
                </ScrollLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center space-x-1">
              <ProfileMenu />
              {showCart && (
                <button
                  onClick={openCart}
                  className="relative p-2 hover:opacity-70 transition-opacity"
                  aria-label="Ver carrito"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Page Title */}
          {pageTitle && (
            <div className="pb-4">
              <h1 className="text-3xl font-bebas tracking-wider text-foreground">
                {pageTitle}
              </h1>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="py-4 px-4 space-y-1">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.label}
                  to={link.href}
                  className="block py-3 text-sm font-semibold tracking-[0.15em] text-foreground/70 hover:text-foreground uppercase border-b border-border/50 last:border-0 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </ScrollLink>
              ))}
              <Link
                to="/blog"
                className="block py-3 text-sm font-semibold tracking-[0.15em] text-foreground/70 hover:text-foreground uppercase transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                BLOG
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-foreground text-background py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-bebas text-4xl tracking-widest text-background mb-3">ATELIER ROMA</p>
            <p className="text-background/50 text-sm leading-relaxed max-w-xs">
              Ropa diseñada para destacar. Playeras, sudaderas y gorras con carácter — hechas para las calles de México.
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-background/40">Tienda</h3>
            <div className="space-y-3">
              <ScrollLink to="/#products" className="block text-sm text-background/70 hover:text-background transition-colors">
                Playeras
              </ScrollLink>
              <ScrollLink to="/#products" className="block text-sm text-background/70 hover:text-background transition-colors">
                Sudaderas
              </ScrollLink>
              <ScrollLink to="/#products" className="block text-sm text-background/70 hover:text-background transition-colors">
                Gorras
              </ScrollLink>
              <ScrollLink to="/#products" className="block text-sm text-background/70 hover:text-background transition-colors">
                Novedades
              </ScrollLink>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-background/40">Info</h3>
            <div className="space-y-3">
              <Link to="/blog" className="block text-sm text-background/70 hover:text-background transition-colors">
                Blog
              </Link>
              <a href="mailto:hola@atelierroma.mx" className="block text-sm text-background/70 hover:text-background transition-colors">
                Contacto
              </a>
              <Link to="/my-orders" className="block text-sm text-background/70 hover:text-background transition-colors">
                Mis Pedidos
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-background/40 text-xs">
          <p>&copy; {new Date().getFullYear()} Atelier Roma. Todos los derechos reservados.</p>
          <p className="tracking-widest uppercase text-[10px]">atelierroma.mx</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>

      {showCart && <FloatingCart hideOnMobile={hideFloatingCartOnMobile} />}
    </>
  )
}