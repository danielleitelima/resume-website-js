const IMAGE_FOLDER = 'public';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    svg {
      display: block;
    }
  </style>
  <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    </svg>
  </div>
`;

class AppIcon extends HTMLElement {
    static observedAttributes = ['icon'];

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        await this.render();
    }

    async attributeChangedCallback() {
        await this.render();
    }

    async render() {
        const icon = this.getAttribute('icon');
        if (icon) {
            try {
                const svgContent = await this.loadSvg(icon);
                if (this.isValidSvg(svgContent)) {
                    this.shadowRoot.querySelector('.icon').innerHTML = svgContent;
                } else {
                    console.error('Invalid SVG content for icon:', icon);
                }
            } catch (error) {
                console.error('Error rendering icon:', error);
            }
        }
    }

    isValidSvg(svgContent) {
        if (svgContent) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgContent, 'image/svg+xml');
            const svgTag = doc.documentElement;

            return svgTag && svgTag.tagName.toLowerCase() === 'svg';
        }
        return false;
    }

    async loadSvg(icon) {
        const url = new URL(document.location.href);
        const iconUrl = `${url.protocol}//${url.host}/${IMAGE_FOLDER}/${icon}.svg`;
        try {
            const response = await fetch(iconUrl);
            if (response.ok) {
                return await response.text();
            } else {
                console.error(`Error fetching SVG: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}

window.customElements.define('app-icon', AppIcon);