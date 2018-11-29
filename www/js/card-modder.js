class CardModder extends HTMLElement {

    render() {
        return html `${this.card}`;
    }

    async setConfig(config) {
        this.config = config;

        let tag = this.config.card.type;
        if (tag.startsWith("custom:"))
            tag = tag.substr(7);
        else
            tag = `hui-${tag}-card`;
        this.card = document.createElement(tag);
        this.card.setConfig(config.card);
        this.appendChild(this.card);

        if (this.card.updateComplete) {
            await this.card.updateComplete;
        }
        this._cardMod();
    }

    async _cardMod() {
        if (!this.config.style) return;
        let target = this.card;

        let maxDelay = 5000;
        while (maxDelay) {
            if (this.card.shadowRoot &&
                this.card.shadowRoot.querySelector("ha-card")) {
                target = this.card.shadowRoot.querySelector("ha-card");
                break;
            } else if (this.card.querySelector("ha-card")) {
                target = this.card.querySelector("ha-card");
                break;
            } else if (this.card.firstChild && this.card.firstChild.shadowRoot &&
                this.card.firstChild.shadowRoot.querySelector("ha-card")) {
                target = this.card.firstChild.shadowRoot.querySelector("ha-card");
                break;
            }

            maxDelay -= 100;
            await new Promise(resolve => setTimeout(() => resolve(), 100));
        }

        for (var k in this.config.style) {
            target.style.setProperty(k, this.config.style[k]);
        }

    }

    set hass(hass) {
        if (!hass) return;
        if (this.card) this.card.hass = hass;
    }

    getCardSize() {
        return this.config.report_size ? this.config.report_size : this.card.getCardSize();
    }
}

customElements.define('card-modder', CardModder);