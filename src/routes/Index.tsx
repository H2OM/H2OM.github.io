import React from "react";

export const API = async ({params, request}: { params: any, request: any }): Promise<false | object[]> => {
    return await fetch('https://opentdb.com/api.php?amount=10&category=22')
        .then(request => {
            if (!request.ok) {
                return false;
            }

            return request.json();
        })
        .then(data => {
            if (data.results !== undefined) {
                return data.results;
            } else {
                return false;
            }
        })
        .catch(() => {
            return false;
        });
}

export default function Index() {
   return <h1>index</h1>
}
