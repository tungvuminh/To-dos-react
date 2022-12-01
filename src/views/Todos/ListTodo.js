import React from 'react';
import './ListTodo.scss';
import AddTodo from './AddTodo';
import { toast } from 'react-toastify';

class ListTodo extends React.Component {
    state = {
        listTodos: [

        ],
        editTodo: {}
    }
    addNewTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo],
        })
        toast.success("Thành công")
    }
    handleDelete = (todo) => {
        let currentTodo = this.state.listTodos;
        currentTodo = currentTodo.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: currentTodo
        })
        toast.success("Xoá thành công")
    }
    handleEdit = (todo) => {
        let { editTodo, listTodos } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        if (isEmptyObj === false && editTodo.id === todo.id) {

            let listTodosCopy = [...listTodos]
            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));
            listTodosCopy[objIndex].title = editTodo.title;
            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })
            return;
        }
        this.setState({
            editTodo: todo
        })
    }
    handleOnchangeEdit = (event) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }
    render() {
        let { listTodos, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        console.log('check', editTodo)
        return (
            <div className='list-todo-container'>
                <AddTodo
                    addNewTodo={this.addNewTodo}
                />
                <div className='list-todo-content'>
                    {listTodos && listTodos.length > 0 &&
                        listTodos.map((item, index) => {
                            return (
                                <div className='todochild' key={item.id}>
                                    {isEmptyObj === true ?
                                        <span> {index + 1}-{item.title}</span>
                                        :
                                        <>
                                            {editTodo.id === item.id ?
                                                <span>
                                                    {index + 1}-<input
                                                        value={editTodo.title}
                                                        onChange={(event) => this.handleOnchangeEdit(event)}
                                                    />
                                                </span>
                                                :
                                                <span>
                                                    {index + 1}-{item.title}
                                                </span>
                                            }
                                        </>

                                    }
                                    <button className='edit'
                                        onClick={() => this.handleEdit(item)}
                                    >
                                        {isEmptyObj === false && editTodo.id === item.id ?
                                            'Save' : 'Edit'
                                        }

                                    </button>
                                    <button className='delete'
                                        onClick={() => this.handleDelete(item)}

                                    >Delete</button>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}
export default ListTodo;