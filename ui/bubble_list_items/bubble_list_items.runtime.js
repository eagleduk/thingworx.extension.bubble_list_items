TW.Runtime.Widgets.bubble_list_items = function () {
  globalThis.bubble_list_items = this;
  this.runtimeProperties = function () {
    return {
      supportsAutoResize: true,
      needsDataLoadingAndError: true,
    };
  };

  this.serviceInvoked = function (serviceName) {
    if (serviceName === "Evaluate") {
      const items = this.getProperty("selectedData");
      this.evaluateItems(items);
    }
  };

  this.renderHtml = function () {
    this.ROWDATA = {};
    return `<div class="widget-content widget-bubble_list_items"><div class="bubble-list-content"></div></div>`;
  };

  this.afterRender = function () {};

  this.updateProperty = function (updatePropertyInfo) {
    if (!this.RESULT) {
      console.log(updatePropertyInfo.TargetProperty, " RESULT");
      this.RESULT = updatePropertyInfo.RawSinglePropertyValue;
    }
    if (updatePropertyInfo.TargetProperty === "Data") {
      const items = updatePropertyInfo.ActualDataRows;
      this.appendItems(items);
    } else if (updatePropertyInfo.TargetProperty === "selectedData") {
      const autoRun = this.getProperty("Auto Evaluate");
      const items = updatePropertyInfo.ActualDataRows;
      if (autoRun) {
        this.evaluateItems(items);
      } else {
        this.setProperty("selectedData", items);
      }
    }
  };

  this.appendItems = function (items) {
    items.forEach((item) => {
      this.appendItem(item);
    });
  };

  this.appendItem = function (item) {
    const bubbleContent = this.jqElement.find(".bubble-list-content")[0];

    const displayField = this.getProperty("DisplayField");
    const valueField = this.getProperty("ValueField");
    const key = item[valueField];

    const content = bubbleContent.querySelector(`section[id="${key}"]`);
    if (content) return;

    const section = document.createElement("section");
    section.id = key;

    const title = document.createElement("span");
    title.className = "item-title";
    title.innerText = item[displayField];

    const del = document.createElement("span");
    del.className = "item-delete";
    del.innerText = "x";
    del.addEventListener("click", (e) => {
      e.target.parentNode.remove();
      this.removeItem(key);
    });

    section.appendChild(title);
    section.appendChild(del);

    bubbleContent.appendChild(section);
    this.ROWDATA = {
      ...this.ROWDATA,
      [key]: item,
    };
    this.RESULT.rows = Object.values(this.ROWDATA);
    this.setProperty("Data", this.RESULT);
  };

  this.removeItem = function (key) {
    const bubbleContent = this.jqElement.find(".bubble-list-content")[0];
    const content = bubbleContent.querySelector(`section[id="${key}"]`);
    if (content) content.remove();

    if (this.ROWDATA[key]) delete this.ROWDATA[key];

    this.RESULT.rows = Object.values(this.ROWDATA);
    this.setProperty("Data", this.RESULT);
  };

  this.evaluateItems = function (items) {
    const selected = this.getProperty("SelectField");
    const valueField = this.getProperty("ValueField");
    items.forEach((item) => {
      let key = item[valueField];
      item[selected] ? this.appendItem(item) : this.removeItem(key);
    });
  };
};
