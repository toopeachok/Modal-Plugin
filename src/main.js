import {$} from '@/base'
import '@/modal'
import '@/styles/main.scss'
import '@/styles/modal.scss'

const modal = $.modal({
  title: 'Hello Modal',
  width: '600px',
  closable: true,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, expedita!</p>`
});

document.querySelector('p').addEventListener('click', () => {

  modal.open();

});