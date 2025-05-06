import React from 'react';
import Feed from './Posts/Feed';
import Upload from './Upload';

export default function Home() {
    return (
        <div className="p-4">
            <Upload />
            <hr className="my-6" />
            <Feed />
        </div>
    );
}
