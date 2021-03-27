import { ComponentsBuilder } from "./components.js";
import { constants } from "./constants.js";

export class TerminalController {
  #userCollor = new Map();

  constructor() {}

  #pickCollor = function () {
    return `#${((1 << 24) * Math.random() | 0).toString(16)}-fg`;
  }

  #getUserCollor = function (userName) {
    if (this.#userCollor.has(userName)) return this.#userCollor.get(userName);

    const collor = this.#pickCollor();
    this.#userCollor.set(userName, collor);

    return collor;
  }

  #onInputReceived = function (eventEmitter) {
    return function () {
      const message = this.getValue();
      eventEmitter.emit(constants.events.app.MESSAGE_SENT, message);
      this.clearValue();
    }
  }

  #onMessageReceived({ screen, chat }) {
    return msg => {
      const { userName, message } = msg;
      const collor = this.#getUserCollor(userName);
      chat.addItem(`{${collor}}{bold}${userName}{/}: ${message}`);
      screen.render();
    }
  }

  #onLogChanged = function ({ screen, activityLog }) {
    return msg => {
      const [username] = msg.split(/\s/);
      const collor = this.#getUserCollor(username);
      activityLog.addItem(`{${collor}}{bold}${msg.toString()}{/}`);
      screen.render()
    }
  }

  #onStatusChanged = function ({ screen, status }) {
    return users => {
      const { content } = status.items.shift();
      status.clearItems();
      status.addItem(content);

      users.forEach(userName => {
        const collor = this.#getUserCollor(userName);
        status.addItem(`{${collor}}{bold}${userName}{/}`);
      });

      screen.render();
    }
  }

  #registerEvents = function (eventEmitter, components) {
    eventEmitter.on(constants.events.app.MESSAGE_RECEIVED, this.#onMessageReceived(components));
    eventEmitter.on(constants.events.app.ACTIVITYLOG_UPDATED, this.#onLogChanged(components));
    eventEmitter.on(constants.events.app.STATUS_UPDATED, this.#onStatusChanged(components));
  }

  async initializeTable(eventEmitter) {
    const components = new ComponentsBuilder()
      .setScreen({ title: 'HackerChat | Fabiano Stoffel' })
      .setLayoutComponent()
      .setInputComponent(this.#onInputReceived(eventEmitter))
      .setChatComponent()
      .setActivityLogComponent()
      .setStatusComponent()
      .build();

    this.#registerEvents(eventEmitter, components);
    components.input.focus();
    components.screen.render();
  }
}