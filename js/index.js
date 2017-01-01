"use strict";

var Modal = ReactBootstrap.Modal;
var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var Button = ReactBootstrap.Button;

var content = typeof localStorage["RecipeBookContent"] != "undefined" ? JSON.parse(localStorage["RecipeBookContent"]) : [{ name: 'Scrambled eggs', time: 15, ingredients: 'eggs,corn,salt,pepper', prepare: 'eggs on pan. add corn, salt and pepper' }, { name: 'Tosts', time: 5, ingredients: 'bread,ham,tomato', prepare: 'put ham and tomato on bread. bake in the oven.' }];

var Add = React.createClass({
  displayName: "Add",

  getInitialState: function getInitialState() {
    return {
      name: '', time: 0, ingredients: '', prepare: '', modal: false
    };
  },
  openModal: function openModal() {
    this.setState({
      modal: true
    });
  },
  closeModal: function closeModal() {
    this.setState({
      modal: false
    });
  },
  handleChangeName: function handleChangeName(e) {
    this.setState({ name: e.target.value });
  },
  handleChangeTime: function handleChangeTime(e) {
    this.setState({ time: e.target.value });
  },
  handleChangeIngredients: function handleChangeIngredients(e) {
    this.setState({ ingredients: e.target.value });
  },
  handleChangePrepare: function handleChangePrepare(e) {
    this.setState({ prepare: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    this.props.onClick(this.state);
    this.setState({
      name: '', time: 0, ingredients: '', prepare: '', modal: false
    });
  },
  handleCancel: function handleCancel() {
    this.setState({
      name: '', time: 0, ingredients: '', prepare: '', modal: false
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        Button,
        { onClick: this.openModal, bsStyle: "primary", bsSize: "lg" },
        "Add recipe"
      ),
      React.createElement(
        Modal,
        { show: this.state.modal, onHide: this.closeModal },
        React.createElement(
          Modal.Header,
          null,
          React.createElement(
            Modal.Title,
            null,
            "Recipe"
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "form",
            null,
            React.createElement(
              FormGroup,
              null,
              "Name:",
              React.createElement(FormControl, { type: "text", value: this.state.name, placeholder: "Enter name", onChange: this.handleChangeName }),
              "Time: ",
              React.createElement(FormControl, { type: "number", value: this.state.time, placeholder: "Enter time", onChange: this.handleChangeTime }),
              "Ingredients: ",
              React.createElement(FormControl, { type: "text", value: this.state.ingredients, placeholder: "Enter name", onChange: this.handleChangeIngredients }),
              "Preparation: ",
              React.createElement(FormControl, { componentClass: "textarea", value: this.state.prepare, placeholder: "Enter description", onChange: this.handleChangePrepare })
            )
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: this.handleSubmit, bsStyle: "primary" },
            "Save"
          ),
          React.createElement(
            Button,
            { onClick: this.handleCancel },
            "Cancel"
          )
        )
      )
    );
  }
});

var Edit = React.createClass({
  displayName: "Edit",

  getInitialState: function getInitialState() {
    return { name: '', time: 0, ingredients: '', prepare: '', showModal: false };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.showModal != this.state.showModal) {
      this.setState({
        name: nextProps.recipe.name,
        time: nextProps.recipe.time,
        ingredients: nextProps.recipe.ingredients,
        prepare: nextProps.recipe.prepare,
        showModal: nextProps.showModal
      });
    }
  },
  closeModal: function closeModal() {
    this.setState({
      showModal: false
    });
  },
  handleChangeName: function handleChangeName(e) {
    this.setState({ name: e.target.value });
  },
  handleChangeTime: function handleChangeTime(e) {
    this.setState({ time: e.target.value });
  },
  handleChangeIngredients: function handleChangeIngredients(e) {
    this.setState({ ingredients: e.target.value });
  },
  handleChangePrepare: function handleChangePrepare(e) {
    this.setState({ prepare: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    this.props.onClick(this.state);
    this.setState({
      name: '', time: '', ingredients: '', prepare: '', showModal: false
    });
  },
  handleCancel: function handleCancel() {
    this.setState({
      name: '', time: '', ingredients: '', prepare: '', showModal: false
    });
  },
  render: function render() {
    return React.createElement(
      Modal,
      { show: this.state.showModal, onHide: this.closeModal },
      React.createElement(
        Modal.Header,
        null,
        React.createElement(
          Modal.Title,
          null,
          "Recipe"
        )
      ),
      React.createElement(
        Modal.Body,
        null,
        React.createElement(
          "form",
          null,
          React.createElement(
            FormGroup,
            null,
            "Name:",
            React.createElement(FormControl, { type: "text", value: this.state.name, placeholder: "Enter name", onChange: this.handleChangeName }),
            "Time: ",
            React.createElement(FormControl, { type: "number", value: parseInt(this.state.time), placeholder: "Enter time", onChange: this.handleChangeTime }),
            "Ingredients: ",
            React.createElement(FormControl, { type: "text", value: this.state.ingredients, placeholder: "Enter name", onChange: this.handleChangeIngredients }),
            "Preparation: ",
            React.createElement(FormControl, { componentClass: "textarea", value: this.state.prepare, placeholder: "Enter description", onChange: this.handleChangePrepare })
          )
        )
      ),
      React.createElement(
        Modal.Footer,
        null,
        React.createElement(
          Button,
          { onClick: this.handleSubmit, bsStyle: "primary" },
          "Save"
        ),
        React.createElement(
          Button,
          { onClick: this.handleCancel },
          "Cancel"
        )
      )
    );
  }
});

var RecipeBook = React.createClass({
  displayName: "RecipeBook",

  getInitialState: function getInitialState() {
    return {
      content: this.props.content,
      modalEdit: false,
      current: 0
    };
  },
  handleSubmit: function handleSubmit(newRecipe) {
    var con = this.state.content;
    con.push({ name: newRecipe.name, time: newRecipe.time, ingredients: newRecipe.ingredients, prepare: newRecipe.prepare });
    this.setState({ content: con });
    localStorage.setItem("RecipeBookContent", JSON.stringify(this.state.content));
  },
  handleDelete: function handleDelete(e) {
    var con = this.state.content;
    con.splice(e.target.value, 1);
    this.setState({ content: con });
    localStorage.setItem("RecipeBookContent", JSON.stringify(this.state.content));
  },
  modalEditOn: function modalEditOn(e) {
    this.setState({ modalEdit: true, current: e.target.value });
    console.log(this.state.modalEdit);
  },
  handleEdit: function handleEdit(editedRecipe) {
    console.log("A");
    var con = this.state.content;
    con[this.state.current] = { name: editedRecipe.name, time: editedRecipe.time, ingredients: editedRecipe.ingredients, prepare: editedRecipe.prepare };
    this.setState({ content: con });
    this.setState({ modalEdit: false });
    localStorage.setItem("RecipeBookContent", JSON.stringify(this.state.content));
  },
  render: function render() {
    var recipes = this.state.content.map(function (elem, idx) {
      var ingredients = elem.ingredients.split(",").map(function (ing) {
        return React.createElement(
          "li",
          null,
          ing
        );
      });
      return React.createElement(
        Panel,
        { header: elem.name, eventKey: idx, bsStyle: "primary" },
        React.createElement(
          "b",
          null,
          "Time:"
        ),
        " ",
        elem.time,
        " min",
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Ingredients:"
        ),
        React.createElement(
          "ul",
          null,
          ingredients
        ),
        React.createElement(
          "b",
          null,
          "Preparation:"
        ),
        elem.prepare,
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(
          Button,
          { value: idx, onClick: this.handleDelete, bsStyle: "danger", bsClass: "btn btn-danger pull-right btn-space" },
          "Delete"
        ),
        React.createElement(
          Button,
          { value: idx, onClick: this.modalEditOn, bsClass: "btn btn-default pull-right" },
          "Edit"
        )
      );
    }.bind(this));
    return React.createElement(
      "div",
      null,
      React.createElement(
        Accordion,
        null,
        recipes
      ),
      React.createElement(Add, { onClick: this.handleSubmit }),
      React.createElement(Edit, { recipe: this.state.content[this.state.current], showModal: this.state.modalEdit, onClick: this.handleEdit })
    );
  }
});
/*localStorage.removeItem("RecipeBookContent");*/
ReactDOM.render(React.createElement(RecipeBook, { content: content }), document.getElementById('book'));