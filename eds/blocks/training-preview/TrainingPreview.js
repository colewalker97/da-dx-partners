import { getLibs } from '../../scripts/utils.js';
import { trainingPreviewStyles } from './TrainingPreviewStyles.js';

const miloLibs = getLibs();
const { html, LitElement } = await import(`${miloLibs}/deps/lit-all.min.js`);
export default class TrainingPreview extends LitElement {
  static styles = [
    trainingPreviewStyles,
  ];

  static properties = { blockData: { type: Object } };

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  async connectedCallback() {
    super.connectedCallback();
    // fetch if needed
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`<div class="training-preview-container"></div> `;
  }
}
