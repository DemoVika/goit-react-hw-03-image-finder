import css from './button.module.css';

export const Button = props => {
  return (
    <button
      className={css.button}
      type="button"
      onClick={() => props.loadMoreFn()}
    >
      Load more
    </button>
  );
};
