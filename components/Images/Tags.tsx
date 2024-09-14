'use client'
import { XIcon } from "lucide-react"
import { Dialog } from '@headlessui/react'
import { useEffect, useState, useRef } from 'react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const Tags = ({ selectedImageIds, onTagsUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tagName, setTagName] = useState('');
    const dialogRef = useRef(null);

    const handleAddTag = () => {
        if (tagName.trim() === '') return;

        let existingTags;
        try {
            existingTags = JSON.parse(localStorage.getItem('tags') || '[]');
            if (!Array.isArray(existingTags)) {
                existingTags = [];
            }
            if (existingTags.length > 10) {
                toast.error('You can only have up to 10 tags.');
                return;
            }

            const tagIndex = existingTags.findIndex(tag => {
                return Object.keys(tag).includes(tagName.trim());
            });

            if (tagIndex !== -1) {
                existingTags[tagIndex] = {
                    [tagName.trim()]: selectedImageIds
                };
                toast.success('Tag ' + tagName + ' updated successfully.');
            } else {
                const newTag = {
                    [tagName.trim()]: selectedImageIds
                };
                existingTags.push(newTag);
                toast.success('Tag ' + tagName + ' added successfully.');
            }

            try {
                localStorage.setItem('tags', JSON.stringify(existingTags));
                onTagsUpdate(existingTags); // Notify parent about the update
            } catch (error) {
                console.error('Error saving tags to localStorage:', error);
            }
        } catch (error) {
            console.error('Error parsing tags from localStorage:', error);
            existingTags = [];
        }
        setTagName('');
        setIsOpen(false);
    };

  

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                handleAddTag();
            }
        };

        if (isOpen) {
            
            const dialogElement = dialogRef.current;
            dialogElement?.addEventListener('keydown', handleKeyDown);

            return () => {
                dialogElement?.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, tagName, selectedImageIds]);

    return (
        <>
            <button
                className={`font-bold text-center block px-4 py-2 text-sm rounded-3xl text-white ${selectedImageIds.length === 0 ? 'bg-primary-100' : 'bg-primary-300 hover:bg-primary-400'}`}
                role="button"
                disabled={selectedImageIds.length === 0}
                id="create-tag"
                onClick={() => setIsOpen(true)}
            >
                Create Tag
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex justify-center items-center z-50 px-2">
                <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
                <div ref={dialogRef} className="relative overflow-y-scroll h-auto md:max-h-[90vh] max-h-[80vh] w-full md:max-w-3xl bg-black/80 backdrop-blur-xl grid gap-8 max-w-7xl mx-auto py-4 md:py-12 px-4 sm:px-6 lg:px-8 rounded-3xl">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Create A New Tag</h1>
                        <button onClick={() => setIsOpen(false)}>
                            <XIcon className="text-primary-950"/>
                        </button>
                    </div>

                    <input
                    autoFocus
                        className="w-full rounded-lg border px-4 py-2 text-sm text-black placeholder:text-primary-500 border-primary-800 bg-transparent text-white placeholder:text-primary-400"
                        placeholder="Enter a tag name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                    />
                    <div className="flex justify-end w-full">
                        <button 
                            className="bg-white hover:bg-primary-950 text-black font-semibold text-center block px-4 py-2 text-sm rounded-3xl disabled:bg-primary-500"
                            onClick={handleAddTag}
                            disabled={tagName.trim() === ''}
                        >
                            Add Tag
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default Tags;
