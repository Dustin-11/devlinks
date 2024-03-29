// import PreviewHeader from "../components/preview-header";
// import PreviewLinks from "../components/preview-links";
// import PreviewUser from "../components/preview-user";

export default function Preview() {
    return(
        <div className="bg-customWhite h-screen w-screen md:bg-customLightGrey">
            <div className="md:border-2 md:bg-customPurple md:fixed md:w-full md:h-2/5 md:z-10 md:rounded-b-[36px]"></div>
            {/* <PreviewHeader></PreviewHeader> */}
            <main id="scroll-Container" className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
            left-1/2 transform -translate-x-1/2 rounded-lg
            overflow-y-scroll md:bg-customWhite md:z-50 md:h-[535px] md:w-2/5 md:shadow-md md:top-1/4 lg:w-1/3 xl:w-1/4">
                {/* <div id="scroll-Container" className="md:h-[535px] md:relative md:overflow-y-scroll md:flex md:justify-center md:rounded-3xl
                md:w-2/5 md:mx-auto md:mt-20 md:shadow-md md:bg-customWhite md:z-50">
                    <div className="md:absolute md:z-50"> */}
                {/* <PreviewUser></PreviewUser>
                <PreviewLinks></PreviewLinks> */}
                {/* </div>
                </div> */}

            </main>
        </div>
    )
}