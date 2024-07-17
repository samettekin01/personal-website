import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Tabs from "../tabs/tabs"
import { signStatus } from "../redux/slices/signinSlice"

function AdminPanel() {
    const [error, setError] = useState("")
    const [btn, setBtn] = useState(false)

    const isSignIn = useSelector(state => state.signin.sign)
    const dispatch = useDispatch()

    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            setBtn(true)
            handleSignIn(values.email, values.password)
        }
    })

    const handleSignIn = (email, password) => {
        if (isSignIn === false) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    dispatch(signStatus(true))
                    values.password = ""
                    setBtn(false)
                })
                .catch(() => {
                    setError(`Giriş Başarısız: Mail veya şifre hatalı`)
                    dispatch(signStatus(false))
                    setBtn(false)
                    setTimeout(() => {
                        setError("")
                    }, 5000)
                })
        }
    }
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(signStatus(true))
            } else {
                dispatch(signStatus(false))
            }
        })
    }, [dispatch])
    return (
        <div className="flex justify-center items-center w-full">
            {!isSignIn ?
                <div className="flex justify-center items-center w-full flex-col">
                    <div
                        className={`bg-red-500 p-2 rounded-md text-sm shadow-md ${error ? "opacity-90" : "opacity-0"}`}
                    >
                        {error}
                    </div>
                    <form className="flex flex-col w-3/5" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={values.email}
                            required
                            autoComplete="email"
                            className="text-black p-1 rounded-md outline-sky-600"
                        />
                        <label htmlFor="password" >Password:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password}
                            required
                            autoComplete="current-password"
                            className="text-black p-1 rounded-md outline-sky-600"
                        />
                        <button type="submit" className="p-2 mt-2 bg-sky-500 rounded-md w-1/5 ml-auto whitespace-nowrap min-w-fit" disabled={btn}>Sign in</button>
                    </form>
                </div>
                : <Tabs />}

        </div >
    )
}

export default AdminPanel