export default function html([first, ...strings], ...values) {
    return values.reduce(
            (acc, cur) => acc.concat(cur, strings.shift()), 
            [first]
        )
        .filter(x => (x && x !== true) || x === 0)
        .join('');
}

export function createStore(reducer) {
    // reducer nguời dùng thư viện tự tạo, có những logic
    // để đưa ra những trạng thái hiện tại của dữ liệu
    // vì lần dầu tiên được gọi, reducer k có tham số
    // nên nó trả về giá trị init được khởi tạo bên reducer
    let state = reducer();

    // roots để lưu lại những mã html của components của root, sau này sẽ duyệt qua để innerHTML cho nó
    // dùng map vì những components của root là những object
    // 1 object bình thường k thể nào có key là 1 object được
    const roots = new Map();

    function render() {
        for (const [root, components] of roots) {
            const output = components();

            root.innerHTML = output;
        }
    }

    return {
        // mình sẽ đính kèm những components vào những roots muốn đính kèm
        // sau đó render ra
        attach(components, root) {
            roots.set(root, components);
            render();
        },
        // connect dùng để nối, nghĩa là lấy ra những thằng cần thiết để
        // hiển thị ra màn hình dựa trên selector,
        // selector để giá trị mặc định chính là những state được khởi tạo ban đầu
        connect(selector = state => state) {
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args));
        },
        // Nhận vào những việc ta muốn làm với dữ liệu trên màn hình
        // ví dụ thêm sửa xoá, nếu muốn xoá thì phải có id đúng k, thêm hay sửa thì cũng
        // cần những thông tin kiểu vậy, thì args chính là những thông tin đó
        // nó sẽ giúp ích cho reducer làm việc chính xác
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        }
    }
}