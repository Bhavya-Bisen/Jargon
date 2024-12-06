import React from "react";

export const Footer=()=>{
    return (
		<>
			<div className=" h-1/2 w-full flex md:flex-row flex-col justify-around items-start pt-20 px-20">
				<div className="p-5 ">
					<ul>
						<li className="text-gray-800 hover:text-[rgba(112,65,22,1)] font-bold text-2xl pb-4">
                            <a href="/">Home</a>
                        </li>
                        <li className="hover:text-[rgba(112,65,22,1)] text-gray-500 text-md pb-2 font-semibold">
                            <a href='https://dnk.cept.gov.in/customers.web/'>Dak Karmayogi Portal</a>
                        </li>
                        <li className="hover:text-[rgba(112,65,22,1)] text-gray-500 text-md pb-2 font-semibold">
                            <a href="https://dnk.cept.gov.in/customers.web/">Dak Ghar Niryat Portal</a>
                        </li>
                        <li className="hover:text-[rgba(112,65,22,1)] text-gray-500 text-md pb-2 font-semibold">
                            <a href="/">Saving Schemes</a>
                        </li>
                        <li className="hover:text-[rgba(112,65,22,1)] text-gray-500 text-md pb-2 font-semibold">
                            <a href="/">Delivery History</a>
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
                            <a href="/">Stamp Calendar</a>
                        </li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Product</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
							Locate PostOffice
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
							Performance Daskboard
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
                            Stamp Catalogue
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
                            Track N Trace
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Indian Post</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
                            Feedback
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
                            Right to Information
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
                            About Us
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
							Requirement
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
							Press & Media
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
							Contact
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
							Support Portals
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
                            Forms
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
							Downloads & Resources
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-[rgba(112,65,22,1)]">
							Videos
						</li>
					</ul>
				</div>
			</div>
            <div className="p-0 pt-0 flex justify-center items-center">
                        <img 
                            src="/Facebook.png"
                            alt="Facebook"
                            className="pb-4 w-[50px] h-[70px] justify-center items-center"/>
                        <img 
                            src="/twitter.png"
                            alt="twitter"
                            className="pb-4 w-[50px] h-[70px] justify-center items-center"/>
                        <img 
                            src="/youtube.png"
                            alt="youtube"
                            className="pb-4 w-[70px] h-[90px] justify-center items-center"/>
                        <img 
                            src="/instagram.png"
                            alt="instagram"
                            className="pb-4 w-[50px] h-[70px] justify-center items-center"/>
                    
                </div>
			<div className="flex flex-col justify-center items-center text-center  p-5 ">
				<h1 className=" text-gray-800 font-semibold">
                This website belongs to Department of Posts, Ministry of Communications, Gol. Created & Managed by Tata Consultancy Services Ltd.
                Content owned and updated by Department of Posts, Ministry of Communications, Government of India. Last Updated: 26 Nov 2024 
				</h1>
			</div>
		</>
	);
}