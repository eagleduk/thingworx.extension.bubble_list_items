TW.IDE.Widgets.bubble_list_items = function () {
  this.widgetIconUrl = function () {
    return "'../Common/extensions/BubbleListItems/ui/bubble_list_items/default_widget_icon.ide.png'";
  };

  this.widgetProperties = function () {
    return {
      name: "bubble list items",
      description: "",
      category: ["Common"],
      supportsAutoResize: true,
      properties: {
        ShowDataLoading: {
          baseType: "BOOLEAN",
          defaultValue: true,
        },
        "Auto Evaluate": {
          baseType: "BOOLEAN",
          defaultValue: false,
        },
        selectedData: {
          baseType: "INFOTABLE",
          isBindingTarget: true,
          isBindingSource: false,
        },
        Data: {
          baseType: "INFOTABLE",
          isBindingTarget: true,
          isBindingSource: true,
        },
        DisplayField: {
          isVisible: true,
          isEditable: true,
          baseType: "FIELDNAME",
          sourcePropertyName: "Data",
        },
        ValueField: {
          baseType: "FIELDNAME",
          sourcePropertyName: "Data",
        },
        SelectField: {
          baseType: "FIELDNAME",
          sourcePropertyName: "Data",
        },
      },
    };
  };

  this.widgetServices = function () {
    return {
      Evaluate: { isVisible: true },
    };
  };

  this.afterAddBindingSource = function (bindingInfo) {
    if (bindingInfo["targetProperty"] === "Data") {
      this.setProperty("DisplayField", undefined);
      this.setProperty("ValueField", undefined);
    }
  };

  this.getSourceDatashapeName = function (e) {
    if ("Data" === e) return this.getInfotableMetadataForProperty(e);
  };

  this.afterSetProperty = function (name, value) {
    return false;
  };

  this.renderHtml = function () {
    return `<div class="widget-content widget-bubble_list_items"><div class="bubble-list-content"></div></div>`;
  };

  this.afterRender = function () {
    const bubbleContent = this.jqElement.find(".bubble-list-content")[0];

    for (let i = 1; i < 3; i++) {
      const section = document.createElement("section");

      const title = document.createElement("span");
      title.className = "item-title";
      title.innerText = `select ${i}`;

      const del = document.createElement("span");
      del.className = "item-delete";
      del.innerText = "x";

      section.appendChild(title);
      section.appendChild(del);

      bubbleContent.appendChild(section);
    }
  };
};
