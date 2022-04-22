import "./button.scss";

const AddButton = (props) => {
  return (
    <button type='button' onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default AddButton;
