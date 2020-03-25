import * as views from "./views/Index"
export default st => {
    return`
${views[st.view](st)}
`;}