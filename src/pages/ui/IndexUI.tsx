import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, Shield } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { useBundles } from '@/hooks/useBundles';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * Atelier Roma — Homepage inspirado en Unik Clothing
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

const CATEGORY_CARDS = [
  {
    label: 'PLAYERAS',
    sublabel: 'Gráficos que hablan',
    image: '/ar-cat-playeras.webp',
    href: '/#products',
  },
  {
    label: 'SUDADERAS',
    sublabel: 'Para el frío con estilo',
    image: '/ar-cat-sudaderas.webp',
    href: '/#products',
  },
  {
    label: 'GORRAS',
    sublabel: 'Remata cualquier look',
    image: '/ar-cat-gorras.webp',
    href: '/#products',
  },
];

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts
  } = logic;

  const { bundles, loading: loadingBundles } = useBundles();

  const featuredProducts = filteredProducts.slice(0, 8);
  const bestSellers = filteredProducts.slice(0, 4);

  return (
    <EcommerceTemplate showCart={true}>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[90vh] min-h-[560px] overflow-hidden">
        <img
          src="/ar-hero.webp"
          alt="Atelier Roma — Nueva Temporada"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 pb-12 md:pb-20">
          <p className="text-white/70 uppercase tracking-[0.3em] text-xs mb-3 font-medium">
            Nueva Temporada
          </p>
          <h1 className="font-bebas text-6xl md:text-[7rem] lg:text-[9rem] text-white leading-none tracking-wide mb-6 md:mb-8">
            Atelier Roma
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/#products"
              className="inline-flex items-center gap-2 bg-white text-foreground px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              Explorar Colección
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {collections.length > 0 && (
              <Link
                to="/#collections"
                className="inline-flex items-center gap-2 border border-white text-white px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-foreground transition-colors"
              >
                Ver Colecciones
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ─── LO NUEVO — horizontal scroll ───────────────────────── */}
      {(loading || filteredProducts.length > 0) && (
        <section className="py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">Atelier Roma</p>
                <h2 className="font-bebas text-4xl md:text-5xl tracking-wide text-foreground">
                  Lo Nuevo
                </h2>
              </div>
              <Link
                to="/#products"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1"
              >
                Ver todo <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {loading ? (
              <div className="flex gap-4 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex-none w-52 md:w-64 bg-muted animate-pulse" style={{ aspectRatio: '3/4' }} />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-4 md:gap-5" style={{ width: 'max-content' }}>
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="flex-none w-52 md:w-64">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── CATEGORÍAS ──────────────────────────────────────────── */}
      <section className="py-10 md:py-14 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">Explora</p>
            <h2 className="font-bebas text-4xl md:text-5xl tracking-wide text-foreground">
              Por Categoría
            </h2>
          </div>

          {/* If collections exist, show them; else show hardcoded categories */}
          {!loadingCollections && collections.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {collections.slice(0, 4).map((collection, index) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onViewProducts={handleViewCollectionProducts}
                  eager={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {CATEGORY_CARDS.map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.href}
                  className="group relative overflow-hidden"
                  style={{ aspectRatio: '3/4' }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <p className="text-white/70 text-[10px] uppercase tracking-[0.25em] mb-1">
                      {cat.sublabel}
                    </p>
                    <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-wide leading-none">
                      {cat.label}
                    </h3>
                    <span className="inline-flex items-center gap-1 mt-3 text-white text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver todo <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── BEST SELLERS ────────────────────────────────────────── */}
      <section id="products" className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
                {selectedCollectionId
                  ? collections.find((c) => c.id === selectedCollectionId)?.name
                  : 'Los clásicos que no fallan'}
              </p>
              <h2 className="font-bebas text-4xl md:text-5xl tracking-wide text-foreground">
                {selectedCollectionId ? 'Colección' : 'Lo Más Vendido'}
              </h2>
            </div>
            {selectedCollectionId && (
              <button
                onClick={handleShowAllProducts}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1"
              >
                Ver todo <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted animate-pulse" style={{ aspectRatio: '3/4' }} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border">
              <p className="font-bebas text-3xl text-muted-foreground tracking-wide">
                Próximamente
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Estamos cargando los productos. Vuelve pronto.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── COLLECTIONS (if any) ────────────────────────────────── */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-10 md:py-14 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">Nuestras</p>
              <h2 className="font-bebas text-4xl md:text-5xl tracking-wide text-foreground">
                Colecciones
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {collections.map((collection, index) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onViewProducts={handleViewCollectionProducts}
                  eager={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}



      {/* ─── BRAND EDITORIAL BAND ─────────────────────────────────── */}
      <section className="relative overflow-hidden h-64 md:h-80">
        <img
          src="/ar-hero.webp"
          alt="Atelier Roma"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-white/60 uppercase tracking-[0.4em] text-[10px] mb-3">
            Hecho para destacar
          </p>
          <p className="font-bebas text-5xl md:text-7xl text-white tracking-widest leading-none mb-6">
            Ropa con Carácter
          </p>
          <Link
            to="/#products"
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-white border border-white/60 px-8 py-3 hover:bg-white hover:text-foreground transition-colors"
          >
            Comprar Ahora
          </Link>
        </div>
      </section>

      {/* ─── TRUST BADGES ────────────────────────────────────────── */}
      <section className="py-10 md:py-14 border-t border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border border-border">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm uppercase tracking-wide">Envío Gratis</p>
                <p className="text-xs text-muted-foreground mt-1">En pedidos mayores a $999 MXN</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border border-border">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm uppercase tracking-wide">Devoluciones Gratis</p>
                <p className="text-xs text-muted-foreground mt-1">30 días sin preguntas</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border border-border">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm uppercase tracking-wide">Calidad Garantizada</p>
                <p className="text-xs text-muted-foreground mt-1">Materiales premium, cada pieza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ──────────────────────────────────────────── */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};