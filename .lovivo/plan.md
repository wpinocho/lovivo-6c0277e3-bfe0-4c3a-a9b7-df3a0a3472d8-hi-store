# Store Plan — Atelier Roma (atelierroma.mx)

## 1. Brand & Context
- **Marca:** Atelier Roma — ropa streetwear mexicana
- **Productos:** Playeras gráficas, sudaderas/hoodies, gorras
- **Instagram:** @atelierroma.mx
- **Audiencia:** Jóvenes mexicanos, 18-30 años, estilo urbano, CDMX
- **Referencia de diseño:** Unik Clothing (unikclothing.co.uk)
- **Idioma:** Español (México)
- **Moneda:** MXN

## 2. Design System
- **Estética:** Black/white streetwear puro — fondo blanco, texto negro, fotos editoriales dan todo el color
- **Fuentes:** Bebas Neue (headings/display, `font-bebas`), Space Grotesk (body)
- **Colores:** Primary = negro puro (#0D0D0D), Background = blanco puro
- **Radius:** 0rem (esquinas cortadas como Unik)
- **Bordes:** border-border (light gray 90%)
- **Announcement bar:** bg-foreground (negro), texto blanco, marquee infinito

## 3. Active Plan
- **Estado:** ✅ Homepage completa inspirada en Unik
- **Siguiente paso:** Crear productos reales desde el Dashboard, agregar colecciones (Playeras/Sudaderas/Gorras)

## 4. Recent Changes (newest first)
- 2026-07-31: IndexUI.tsx — Homepage Unik-style: hero fullbleed, horizontal product carousel, category grid, bestsellers, brand editorial band, trust badges
- 2026-07-31: EcommerceTemplate.tsx — Announcement bar marquee + mobile hamburger menu + footer Atelier Roma
- 2026-07-31: index.css — Import Bebas Neue + Space Grotesk, black/white design tokens, radius=0, scrollbar-hide, marquee animation
- 2026-07-31: tailwind.config.ts — Agregó font `bebas: ["Bebas Neue"]`
- 2026-07-31: Imágenes generadas: ar-hero.webp (16:9 editorial hero), ar-cat-playeras.webp, ar-cat-sudaderas.webp, ar-cat-gorras.webp (3:4 category photos)

## 5. Image Inventory
| Slot | URL / Path | Status |
|------|-----------|--------|
| Hero principal | `/ar-hero.webp` | ✅ activo |
| Categoría Playeras | `/ar-cat-playeras.webp` | ✅ activo |
| Categoría Sudaderas | `/ar-cat-sudaderas.webp` | ✅ activo |
| Categoría Gorras | `/ar-cat-gorras.webp` | ✅ activo |

## 6. Known Issues
- Sin productos en DB — el homepage muestra "Próximamente" en bestsellers hasta que se creen productos
- Supabase no conectado (plataforma Lovivo DB sí funciona)

## 7. Pending / Future Sessions
- **Alta prioridad:** Crear productos y colecciones (Playeras, Sudaderas, Gorras) desde el Dashboard
- Mejorar ProductCard con hover effect (image swap) al estilo Unik
- Agregar página de colección con filtros
- Considerar sección "Sobre Nosotros" / brand story
- PDP optimización (page de producto)