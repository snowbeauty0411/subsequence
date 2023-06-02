<template>
    <div v-bind:class="classname">
        <label v-bind:for="id" class="check-radio">
            <input
                v-bind:id="id"
                type="radio"
                v-bind:name="name"
                v-bind:checked="check"
                v-bind:value="val"
                v-bind:disabled="isDisabled"
                v-on:change="$emit('input', $event.target.value)"
            />
            <span class="checkmark"></span>
            <span class="childmess">{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'Checkradio',
    props: {
        val: {
            type: String,
            default() {
                return ''
            }
        },
        name: {
            type: String,
            default() {
                return ''
            }
        },
        id: {
            type: String,
            default() {
                return ''
            }
        },
        classname: {
            type: String,
            default() {
                return ''
            }
        },
        label: {
            type: String,
            default() {
                return ''
            }
        },
        check: {
            type: Boolean,
            default() {
                return false
            }
        },
        isDisabled: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    methods: {
        checked(val) {
            if(this.value === val) {
                return true
            }
            return false
        }
    }
}
</script>

<style lang="scss">
.check-radio {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default radio button */
.check-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
    background-color: #eee;
    border-radius: 50%;
}

/* On mouse-over, add a grey background color */

.check-radio input ~ .checkmark {
    border: 1px solid #333;
    background-color: #fff;
}
/* When the radio button is checked, add a blue background */
.check-radio input:checked ~ .checkmark {
    background-color: #5daf5d;
    border: none;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
    content: '';
    position: absolute;
    display: none;
}

/* Show the indicator (dot/circle) when checked */
.check-radio input:checked ~ .checkmark:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.check-radio .checkmark:after {
    top: 10px;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
}
.childmess {
    position: absolute;
    top: 4px;
    margin-left: 5px;
    font-size: 14px;
    color: #493426;
}
</style>
