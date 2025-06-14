"use client"
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { app } from 'config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

function CreateBusiness() {
const [businessName, setBusinessName] = useState("");
    const [daysAvailable, setDaysAvailable] = useState([]);
    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();
    const router = useRouter();

    /**
     * On Create Business Button On Click to Create business and Save on Firebase
     */
    const onCreateBusiness = async () => {
        console.log("btn Click", businessName);
        await setDoc(doc(db, 'Business', user.email), {
            businessName: businessName.replace(" ", "_"),
            email: user.email,
            daysAvailable: daysAvailable,
            userName: user.given_name + " " + user.family_name
        }).then(resp => {
            console.log("Document Saved");
            toast('New Business Created!');
            router.replace('/dashboard');
        });
    }

    const handleDayChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setDaysAvailable(prev => [...prev, value]);
        } else {
            setDaysAvailable(prev => prev.filter(day => day !== value));
        }
    }

    return (
        <div className='flex flex-col items-center gap-20 my-10 p-14'>
            <Image src='/logo.svg' width={200} height={200} />
            <div className='flex flex-col items-center max-w-3xl gap-4'>
                <h2 className='text-4xl font-bold'>What should we call your business?</h2>
                <p className='text-slate-500'>You can always change this later from settings</p>
                <div className='w-full'>
                    <label className='text-slate-400'>Team Name</label>
                    <Input placeholder="Ex. TubeGuruji"
                        className="mt-2"
                        onChange={(event) => setBusinessName(event.target.value)}
                    />
                    <div>
                        <label className='text-slate-400'>Available Days</label>
                        <div>
                            <input type="checkbox" value="Sunday" onChange={(e) => handleDayChange(e)} /> Sunday
                            <input type="checkbox" value="Monday" onChange={(e) => handleDayChange(e)} /> Monday
                            <input type="checkbox" value="Tuesday" onChange={(e) => handleDayChange(e)} /> Tuesday
                            <input type="checkbox" value="Wednesday" onChange={(e) => handleDayChange(e)} /> Wednesday
                            <input type="checkbox" value="Thursday" onChange={(e) => handleDayChange(e)} /> Thursday
                            <input type="checkbox" value="Friday" onChange={(e) => handleDayChange(e)} /> Friday
                            <input type="checkbox" value="Saturday" onChange={(e) => handleDayChange(e)} /> Saturday
                        </div>
                    </div>
                </div>
                <Button className="w-full"
                    disabled={!businessName}
                    onClick={onCreateBusiness}
                >Create Business</Button>
            </div>
        </div>
    )
}

export default CreateBusiness;
