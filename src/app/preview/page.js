
import PreviewHeader from "../components/preview/preview-header"
import PreviewUser from "../components/preview/preview-user"
import PreviewLinks from "../components/preview/preview-links"

export default function Preview() {
    return(
        <div className="bg-customWhite h-screen w-screen md:bg-customLightGrey">
            <div className="md:border-2 md:bg-customPurple md:fixed md:w-full md:h-2/5 md:z-10 md:rounded-b-[36px]"></div>
                <PreviewHeader></PreviewHeader>
                <main id="scroll-Container" className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
                left-1/2 transform -translate-x-1/2 rounded-lg
                overflow-y-scroll md:bg-customWhite md:z-50 md:h-[535px] md:w-2/5 md:shadow-md md:top-1/4 
                md:flex md:justify-center md:rounded-3xl lg:w-1/3 xl:w-1/4">
                    <div className="w-8/12 md:absolute md:z-50 md:pb-4">
                        <PreviewUser></PreviewUser>
                        <PreviewLinks></PreviewLinks>
                    </div>
                </main>
            </div>
    )
}