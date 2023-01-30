import { html, render } from 'lit-html';

const styles = `
  ul { padding: 0; }
`;
const template = (ctx) => html`
  <style>${styles}</style>
  <div>Process Data</div>
  <input type="text" @keyup=${ctx.inputKeyupHandler} .value=${ctx.pidInputValue}>
  <button .disabled=${ctx.nowPolling} @click=${ctx.startPolling}>Start Polling</button>
  <button .disabled=${!ctx.nowPolling} @click=${ctx.stopPolling}>Stop Polling</button>
  <ul>
  ${
  !!ctx.fileData.length
    ? ctx.fileData.map(data => html`<li>${data}</li>`)
    : 'Waiting for data...'
  }
  </ul>
  `;

export class FileData extends HTMLElement {
  static selector = 'fjs-file-data';

  pidInputValue = '';
  fileData = [];

  socket = null;
  nowPolling = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.openFileDataSocket();

    this.render();
  }

  openFileDataSocket() {
    this.socket = io('http://localhost:8082');
    console.log(this.socket);

    this.socket.on('return-ps-data', (res) => this.handleResponse(res))
  }

  handleResponse(res) {
    let li = null;
    
    if (res.status == 'error') {
      li = res.data;
      this.stopPolling();
    }
    else {
      const psData = res.data;
      let mockData = psData.mockData;
      
      li = `pid: ${psData.pid} | CPU usage: ${mockData.cpuUsage} | Other stuff: ${mockData.otherData}`;
    }

    this.populateList(li);
  }

  inputKeyupHandler = (event) => {
    const target = event.target;
    this.pidInputValue = target.value;
  }

  startPolling = () => {
    console.log('start polling');

    if (!this.nowPolling) {
      this.nowPolling = true;
      this.clearList();

      this.socket.emit('start-polling', { pid: this.pidInputValue });
    }
    else { 
      alert('You are already polling!');
    }
  }

  stopPolling = () => {
    console.log('stop polling');

    if (!this.nowPolling) {
      this.clearList();
      this.populateList('You are not polling!');
    }

    this.nowPolling = false;
    this.socket.emit('stop-polling');
    
    this.render()
  }

  clearList = () => {
    this.fileData = [];
    this.render();
  }

  populateList = (li) => {
    this.fileData.push(li);
    this.render();
  }

  render() {
    render(template(this), this.shadowRoot);
  }
}

customElements.define(FileData.selector, FileData);
