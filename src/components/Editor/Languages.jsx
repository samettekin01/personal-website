import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLangs } from "../../redux/slices/languagesSlices";
import { useFormik } from "formik";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Trash2, Edit2, Plus, X, Check } from "lucide-react";

function Languages() {
    const dispatch = useDispatch();
    const { langs } = useSelector(state => state.langs);
    const [editingLang, setEditingLang] = useState(null);
    const [editValues, setEditValues] = useState({ displayName: "", img: "" });

    const langsDocRef = doc(db, "langs", "languages");

    useEffect(() => {
        dispatch(getLangs());
    }, [dispatch]);

    const { values, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues: {
            displayName: "",
            img: ""
        },
        onSubmit: async (values) => {
            try {
                const time = new Date().valueOf();
                // Key'i küçük harf yap, ama displayName'i olduğu gibi sakla
                const langKey = values.displayName.toLowerCase();
                
                await setDoc(langsDocRef, {
                    [langKey]: {
                        displayName: values.displayName, // Orijinal isim
                        img: values.img,
                        created: time
                    }
                }, { merge: true });
                
                resetForm();
                dispatch(getLangs());
            } catch (error) {
                console.error("Ekleme hatası:", error);
            }
        }
    });

    const handleEdit = (langName) => {
        setEditingLang(langName);
        setEditValues({
            displayName: langs[langName].displayName || langName,
            img: langs[langName].img
        });
    };

    const handleUpdate = async () => {
        try {
            // Yeni key'i küçük harf yap
            const newLangKey = editValues.displayName.toLowerCase();
            
            if (editingLang !== newLangKey) {
                // Key değiştiyse eski kaydı sil, yenisini ekle
                await setDoc(langsDocRef, {
                    [editingLang]: deleteField(),
                    [newLangKey]: {
                        displayName: editValues.displayName,
                        img: editValues.img,
                        created: langs[editingLang].created,
                        updated: new Date().valueOf()
                    }
                }, { merge: true });
            } else {
                // Key aynıysa sadece güncelle
                await setDoc(langsDocRef, {
                    [newLangKey]: {
                        displayName: editValues.displayName,
                        img: editValues.img,
                        created: langs[editingLang].created,
                        updated: new Date().valueOf()
                    }
                }, { merge: true });
            }
            
            setEditingLang(null);
            dispatch(getLangs());
        } catch (error) {
            console.error("Güncelleme hatası:", error);
        }
    };

    const handleDelete = async (langName) => {
        const displayName = langs[langName].displayName || langName;
        if (window.confirm(`${displayName} dilini silmek istediğinize emin misiniz?`)) {
            try {
                await setDoc(langsDocRef, {
                    [langName]: deleteField()
                }, { merge: true });
                
                dispatch(getLangs());
            } catch (error) {
                console.error("Silme hatası:", error);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingLang(null);
        setEditValues({ displayName: "", img: "" });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e);
    };

    return (
        <div className="flex flex-col w-full p-6 gap-6 items-center">
            {/* Add Language Section */}
            <div className="lg:w-3/5 w-full flex flex-col gap-3">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Plus size={24} />
                    Add New Language
                </h3>
                
                <div className="flex gap-3 items-end flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2">
                            Language Name
                        </label>
                        <input
                            name="displayName"
                            onChange={handleChange}
                            value={values.displayName}
                            type="text"
                            placeholder="e.g., JavaScript"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {values.displayName && (
                            <p className="text-xs text-gray-500 mt-1">
                                Will be saved as: <span className="font-mono">{values.displayName.toLowerCase()}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2">
                            Icon URL
                        </label>
                        <input
                            name="img"
                            onChange={handleChange}
                            value={values.img}
                            type="text"
                            placeholder="https://example.com/icon.png"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {values.img && (
                        <div className="w-12 h-12 mb-1">
                            <img
                                src={values.img}
                                alt="Preview"
                                className="w-full h-full object-contain rounded-lg border p-1"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/48?text=?'}
                            />
                        </div>
                    )}

                    <button
                        onClick={handleFormSubmit}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 mb-1"
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>
            </div>

            {/* Languages List */}
            <div className="w-full">
                <h3 className="text-xl font-semibold mb-4">
                    Languages ({Object.keys(langs).length})
                </h3>
                
                {Object.keys(langs).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {Object.keys(langs).map(langKey => (
                            <div 
                                key={langKey}
                                className="flex items-center justify-between rounded-lg p-3 border hover:shadow-md transition-shadow"
                            >
                                {editingLang === langKey ? (
                                    <div className="flex flex-col gap-2 flex-1">
                                        <input
                                            type="text"
                                            value={editValues.displayName}
                                            onChange={(e) => setEditValues({...editValues, displayName: e.target.value})}
                                            className="px-3 py-1.5 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            placeholder="Language name"
                                        />
                                        {editValues.displayName && (
                                            <p className="text-xs text-gray-500 px-1">
                                                Key: <span className="font-mono">{editValues.displayName.toLowerCase()}</span>
                                            </p>
                                        )}
                                        <input
                                            type="text"
                                            value={editValues.img}
                                            onChange={(e) => setEditValues({...editValues, img: e.target.value})}
                                            className="px-3 py-1.5 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            placeholder="Image URL"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleUpdate}
                                                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded text-sm transition-colors flex items-center justify-center gap-1"
                                            >
                                                <Check size={14} /> Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1.5 rounded text-sm transition-colors flex items-center justify-center gap-1"
                                            >
                                                <X size={14} /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <img
                                                className="w-10 h-10 object-contain rounded flex-shrink-0"
                                                src={langs[langKey].img}
                                                alt={langs[langKey].displayName || langKey}
                                                onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=?'}
                                            />
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-medium truncate">
                                                    {langs[langKey].displayName || langKey}
                                                </span>
                                                <span className="text-xs text-gray-200 font-mono truncate">
                                                    {langKey}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-1 flex-shrink-0">
                                            <button
                                                onClick={() => handleEdit(langKey)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(langKey)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
                        <p className="text-lg">No languages added yet</p>
                        <p className="text-sm mt-2">Add your first programming language above ☝️</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Languages;