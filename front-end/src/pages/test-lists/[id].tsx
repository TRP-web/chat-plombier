import client from "@/contentful"
import { ITestList, ITestListFields } from "@/contentful/contentful"
import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"

interface IIdProps {
    testList: ITestList
}

const id: React.FC<IIdProps> = ({testList}) => {
    // console.log(testList)
    return (
        <>
            {testList.fields.title}
        </>
    )
}
export default id

export const getStaticPaths: GetStaticPaths = async () => {
    const testList = await client.getEntries<ITestListFields>({
        content_type: "testList",
        select: "fields.id"
    })

    console.log(testList)

    return {
        paths:  testList.items.map(elem => {
            return {
                params: {
                    id: elem.fields.id
                }
            }
        }),
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params!.id

    const testList = await client.getEntries<ITestListFields>({
        content_type: "testList",
        limit: 1,
        "fields.id": id
    })
    return {
        props: {
            testList: testList.items[0]
        },
        revalidate: 30
    }
}