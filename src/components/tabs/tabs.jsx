import { Tab } from "@headlessui/react"
import ProjectEditor from "../editor/projectEditor";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { signStatus } from "../redux/slices/signinSlice";
import AboutEditor from "../editor/aboutEditor";
import EditProject from "../editor/editProject";

function Tabs() {
    const isUserSignIn = useSelector(state => state.signin.sign)
    const dispatch = useDispatch();
    const handleSignOut = () => {
        if (isUserSignIn) {
            signOut(auth)
                .then(() => dispatch(signStatus(false)))
                .catch(e => alert(`Çıkış yaparken hata oluştu: ${e}`))
            dispatch(signStatus(false))
        }
    }
    return (
        <div className="w-full h-full ">
            <div className="flex justify-end mt-2 mr-2">
                <button className="btn-blue" onClick={handleSignOut}>Sign Out</button>
            </div>
            <Tab.Group>
                <Tab.List className="flex p-1 justify-center">
                    <Tab className="btn-blue">About</Tab>
                    <Tab className="btn-blue">Add Project</Tab>
                    <Tab className="btn-blue">Edit Project</Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel><AboutEditor /></Tab.Panel>
                    <Tab.Panel><ProjectEditor /></Tab.Panel>
                    <Tab.Panel><EditProject /></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default Tabs