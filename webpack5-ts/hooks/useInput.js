import { useCallback, useState } from 'react';
var useInput = function (initialValue) {
    var _a = useState(initialValue), value = _a[0], setValue = _a[1];
    var handler = useCallback(function (e) {
        setValue(e.target.value);
    }, []);
    return [value, handler, setValue];
};
export default useInput;
//# sourceMappingURL=useInput.js.map