"use client"

import Button from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { Formik, FormikProps } from "formik"
import { useState } from "react"

export default function CreateReward() {
  const [showModal, setShowModal] = useState(false)
  const [temporaryCreatedRewards, setTemporaryCreatedRewards] = useState<
    { title: string; cost: number }[]
  >([])

  console.log(temporaryCreatedRewards)

  return (
    <div>
      <Button onClick={() => setShowModal(!showModal)}>show modal</Button>
      {showModal && (
        <Modal showModal={setShowModal}>
          <div className="bg-less-dark rounded-lg p-2 flex flex-col gap-5 justify-center items-center h-full">
            <Formik
              initialValues={{ title: "", cost: 0 }}
              onSubmit={(data) => {
                console.log("HELLO")
                setTemporaryCreatedRewards(
                  temporaryCreatedRewards.concat([data])
                )
              }}
            >
              {({
                handleChange,
                handleSubmit,
                values,
              }: FormikProps<{ title: string; cost: number }>) => (
                <form className="flex flex-col justify-center items-center gap-5">
                  <div
                    className="flex flex-col text-black
                  "
                  >
                    <label>Title</label>
                    <input
                      onChange={handleChange}
                      className="rounded"
                      name="title"
                      type="text"
                      value={values.title}
                    />
                  </div>
                  <div className="flex flex-col text-black">
                    <label>Cost</label>
                    <input
                      name="cost"
                      onChange={handleChange}
                      className="rounded"
                      type="number"
                      value={values.cost}
                    />
                  </div>
                  <Button type="button" onSubmit={handleSubmit}>
                    create
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </div>
  )
}
