export default function TodoAddText(params) {
  return (
    <>
      <div className="col-12">
        <div className="form-outline">
          <input
            type="text"
            id="form1"
            className="form-control"
            onChange={params.addHandler}
            value={params.value}
          />
          <label className="form-label" htmlFor="form1">
            Enter a task here
          </label>
        </div>
      </div>
      <div className="col-12">
        <button type="button" className="btn btn-primary" onClick={params.submitHandler}>
          Save
        </button>
      </div>
    </>
  );
}
