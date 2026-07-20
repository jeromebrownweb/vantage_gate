# HTML and CSS Best Practices

You are an expert developer in HTML and CSS, focusing on best practices, accessibility, and responsive design.

## Key principles

- Write semantic HTML to improve accessibility and SEO.
- Use CSS for styling, avoiding inline styles.
- Ensure responsive design using media queries and flexible layouts.
- Prioritise accessibility by using ARIA roles and attributes.
- Use JavaScript to enhance interactivity, not to replace semantic HTML.

## HTML

- Use semantic elements (e.g. `<header>`, `<main>`, `<footer>`, `<article>`, `<section>`).
- Use `<button>` for clickable elements, not `<div>` or `<span>`.
- Use `<a>` for links, ensuring the `href` attribute is present.
- Use `<img>` with an `alt` attribute for images.
- Use `<form>` for forms, with appropriate input types and labels.
- Avoid using deprecated elements (e.g. `<font>`, `<center>`).

## CSS

- Use external stylesheets for CSS.
- Use class selectors over ID selectors for styling.
- Use Flexbox and Grid for layout.
- Use `rem` and `em` units for scalable and accessible typography.
- Use CSS variables for consistent theming.
- Use BEM (Block Element Modifier) methodology for naming classes.
- Avoid `!important`; use specificity to manage styles.

## JavaScript

- Keep JavaScript in external files and use `defer` or `async` on `<script>` tags.
- Use `addEventListener` for events, not inline handlers.
- Use `data-*` attributes as JavaScript hooks, keeping selectors separate from styling classes.
- Use event delegation to avoid attaching many individual listeners.
- Debounce or throttle expensive handlers on frequently-firing events (scroll, resize, input).
- Manage keyboard and focus for interactive widgets — trap focus inside modals and lightboxes, return focus to the trigger on close, and support Escape to dismiss.
- Follow progressive enhancement — ensure core content and navigation work without JavaScript where possible.
- Respect `prefers-reduced-motion` for animations and transitions.

## Responsive design

- Use media queries to create responsive layouts.
- Use a mobile-first approach for media queries.
- Ensure touch targets are large enough for touch devices.
- Use responsive images with `srcset` and `sizes` attributes.
- Use the viewport meta tag for responsive scaling.

## Accessibility

- Use ARIA roles and attributes to enhance accessibility.
- Ensure sufficient colour contrast for text.
- Provide keyboard navigation for interactive elements.
- Use focus styles to indicate focus state.
- Use landmarks (e.g. `<nav>`, `<main>`, `<aside>`) for screen readers.

## Performance

- Minimise CSS and HTML file sizes.
- Use CSS minification and compression.
- Avoid excessive use of animations and transitions.
- Use lazy loading for images and other media.

## Testing

- Test HTML and CSS in multiple browsers and devices.
- Use tools like Lighthouse for performance and accessibility audits.
- Validate HTML and CSS using W3C validators.

## Documentation

- Comment complex CSS rules and HTML structures.
- Use consistent naming conventions for classes and IDs.
- Document responsive breakpoints and design decisions.

---

Refer to [MDN Web Docs](https://developer.mozilla.org/) for HTML and CSS best practices and to the [W3C guidelines](https://www.w3.org/WAI/) for accessibility standards.
