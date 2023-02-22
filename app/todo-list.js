"use client";

export default function TodoList(params) {
  return (
    <table className="table mb-4">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Todo item</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      {params.tasks.length > 0 ? (
        <tbody>
          {params.tasks.map((task, index) => (
            <tr key={task.id}>
              <th scope="row">{index + 1}</th>
              <td>{task.task}</td>
              <td>{task.status}</td>
              <td>
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={() => params.deleteTaskHandler(task.id)}>
                  Delete
                </button>
                <button
                  type="submit"
                  className="btn btn-success ms-1"
                  onClick={(e) => params.statusChangeHandler(task.id, e)}>
                  Finished
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td colspan="4">
              <div className="p-3 mb-2 bg-info bg-gradient text-dark">
                No Data available
              </div>
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
