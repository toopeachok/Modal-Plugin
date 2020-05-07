import {$} from '@/base';

$.modal = function (options) {

  function _createModalFooter(button = []) {

    if (button.length === 0) return ``;

    const footer = document.createElement('div');

    footer.classList.add('modal-footer');

    button.forEach(btn => {
      const $btn = document.createElement('button');
      $btn.textContent = btn.text;
      $btn.classList.add('btn');
      $btn.classList.add(`btn-${btn.type || 'secondary'}`);
      footer.append($btn);
    });

    return footer;

  }

  function _createModal(options) {

    const DEFAULT_WIDTH = '300px';

    const modal = document.createElement('div');

    modal.classList.add('vmodal');

    const modalHTML = `
    <div class="modal-overlay">

      <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">

        <div class="modal-header">

          <h5 class="modal-title">
          
            ${options.title || `Default title`}
          
          </h5>

          ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ``}

        </div>

        <div class="modal-body" data-content>

          ${options.content || ``}

        </div>

      </div>

    </div>
    `;

    modal.insertAdjacentHTML('afterbegin', modalHTML);

    const footer = _createModalFooter(options.footerButtons);

    modal.querySelector('[data-content]').insertAdjacentHTML('afterend', footer);

    document.body.append(modal);

    return modal;

  }

  const $modal = _createModal(options);

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener);

  const ANIMATION_SPEED = 200;

  let closing = false;

  let destroyed = false;

  const modal = {

    open() {
      if (destroyed) {
        return console.log('Modal is destroyed');
      }

      !closing && $modal.classList.add('open');
    },

    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout( () => {
        $modal.classList.remove('hide');
        closing = false;
        if (typeof  options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED )
    }

  }

  return Object.assign(modal,{

    destroy() {
      $modal.remove();
      $modal.removeEventListener("click", listener);
      destroyed = true;
    },

    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    }

  })

};