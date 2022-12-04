import { defineComponent, toRefs } from "vue";
import { buttonProps, ButtonProps } from "./button-types";
export default defineComponent({
    name: 'CButton',
    props: buttonProps,
    setup(props: ButtonProps, { slots }) {
        const { type, size } = toRefs(props)
        return () => {
            const defaultSlot = slots.default ? slots.default() : '按钮'
            return <button class={`c-btn c-btn--${type.value} c-btn--${size.value}`}>{defaultSlot}</button>
        }
    }
})