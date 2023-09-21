import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../store/slices/registration-slice";

const Wrapper = () => {
  const dispatch = useDispatch();

  const { mode } = useSelector((state: RootState) => state.registration);
  return (
    <div
      className="page-wrapper"
      onClick={(e) => {
        e.preventDefault();
        dispatch(setMode("default"));
      }}
    >
      {mode === "error" && (
        <div
          className="page-wrapper__modal"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h2 className="title error">Произошла ошибка при отправке формы.</h2>
          <h3 className="title error">Попробуйте повторить позже.</h3>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setMode("default"));
            }}
          >
            Закрыть
          </button>
        </div>
      )}
      {mode === "loading" && (
        <div className="page-wrapper__modal page-wrapper__modal_loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h2 className="title">Отправка заявки.</h2>
        </div>
      )}
      {mode === "success" && (
        <div
          className="page-wrapper__modal"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h2 className="title success">Форма успешно отправлена!</h2>
          <h3 className="title success">Ответ прийдёт вам на электронную почту</h3>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setMode("default"));
            }}
          >
            Закрыть окно.
          </button>
        </div>
      )}
    </div>
  );
};

export default Wrapper;
