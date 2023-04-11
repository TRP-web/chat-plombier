import React from "react"
import { GetStaticProps } from "next"
import { ITestList, ITestListFields } from "@/contentful/contentful"
import client from "@/contentful"
import Link from "next/link"

interface IIndexProps {
    testLists: ITestList[]
}

const Index: React.FC<IIndexProps> = ({ testLists }) => {

    console.log(testLists)
    return (
        <>
            {
                testLists.map((elem, index) => {
                    return (
                        <Link key={index} href={`test-lists/${elem.fields.id}`}>
                            <div className="mb-5 text-xl" >
                                <h1 className="text-5xl">{elem.fields.title}</h1>
                                <div>{elem.fields.price}</div>
                            </div>
                        </Link>
                    )
                })
            }
        </>
    )
}
export default Index

export const getStaticProps: GetStaticProps = async () => {
    const testList = await client.getEntries<ITestListFields>({
        content_type: "testList"
    })
    return {
        props: {
            testLists: testList.items
        },
        revalidate: 30
    }
}