import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
function numberOfDecimals(step) {
    const x = step.toString();
    if (x.indexOf('.') > -1) {
        return x.length - x.indexOf('.') - 1;
    }
    return 0;
}
export default function NumberBox({ value, min = 0, max = 100, step = 1, pixelRange = 150, onChange, ...rest }) {
    const precision = numberOfDecimals(step);
    const internalValue = useRef(value);
    const inputRef = useRef(null);
    const prevY = useRef(0);
    const shiftHeld = useRef(false);
    const [inputValue, setInputValue] = useState(value.toFixed(precision));
    const [editing, setEditing] = useState(false);
    const accumulatedDelta = useRef(0);
    useEffect(() => {
        internalValue.current = value;
        setInputValue(value.toFixed(precision));
    }, [value, precision]);
    useEffect(() => {
        function onKeydown(e) {
            if (e.key === 'Shift') {
                shiftHeld.current = true;
            }
        }
        function onKeyup(e) {
            if (e.key === 'Shift') {
                shiftHeld.current = false;
            }
        }
        window.addEventListener('keydown', onKeydown);
        window.addEventListener('keyup', onKeyup);
        return () => {
            window.removeEventListener('keydown', onKeydown);
            window.removeEventListener('keyup', onKeyup);
        };
    }, []);
    function applyDelta(clientY) {
        const delta = prevY.current - clientY;
        prevY.current = clientY;
        accumulatedDelta.current += delta;
        const totalSteps = (max - min) / step;
        const pixelsPerStep = totalSteps > 0 ? pixelRange / totalSteps : 10;
        let stepsMoved = accumulatedDelta.current / pixelsPerStep;
        if (shiftHeld.current) {
            stepsMoved = Math.trunc(delta);
        }
        else {
            stepsMoved = Math.round(stepsMoved);
            accumulatedDelta.current -= stepsMoved * pixelsPerStep;
        }
        if (stepsMoved !== 0) {
            const newValue = internalValue.current + stepsMoved * step;
            const boundedValue = Math.min(max, Math.max(min, newValue));
            if (boundedValue !== internalValue.current) {
                internalValue.current = boundedValue;
                setInputValue(boundedValue.toFixed(precision));
                onChange(boundedValue);
            }
        }
    }
    function onMouseDown(e) {
        if (!editing) {
            // e.preventDefault to bypass user-select which interferes with dragging.
            // Disabling user-select or webkit-user-select at runtime via inline style
            // doesn't seem to work (TODO: we could try toggling classes?)
            e.preventDefault();
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            prevY.current = e.clientY;
        }
    }
    function onMouseMove(e) {
        applyDelta(e.clientY);
    }
    function onMouseUp() {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }
    function onTouchStart(e) {
        if (!editing) {
            e.preventDefault();
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
            prevY.current = e.touches[0].clientY;
        }
    }
    function onTouchMove(e) {
        applyDelta(e.touches[0].clientY);
    }
    function onTouchEnd() {
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
    }
    function onChangeInput(e) {
        setInputValue(e.target.value);
    }
    function onBlur(e) {
        const parsedValue = parseFloat(e.target.value);
        if (!isNaN(parsedValue)) {
            const stepsFromMin = Math.round((parsedValue - min) / step);
            const steppedValue = min + stepsFromMin * step;
            const boundedValue = Math.min(max, Math.max(min, steppedValue));
            internalValue.current = boundedValue;
            setInputValue(boundedValue.toFixed(precision));
            onChange(boundedValue);
        }
        else {
            setInputValue(internalValue.current.toFixed(precision));
        }
        setEditing(false);
    }
    function onDoubleClick() {
        setEditing(true);
        inputRef.current?.focus();
    }
    function onKeyDown(e) {
        if (editing && e.key === 'Enter') {
            inputRef.current?.blur();
        }
    }
    return (_jsx("input", { type: "text", ref: (element) => {
            inputRef.current = element;
        }, value: inputValue, onMouseDown: onMouseDown, onTouchStart: onTouchStart, onChange: onChangeInput, onBlur: onBlur, onDoubleClick: onDoubleClick, onKeyDown: onKeyDown, style: {
            cursor: editing ? 'text' : 'ns-resize',
        }, ...rest }));
}
