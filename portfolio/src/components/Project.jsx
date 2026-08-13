import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({ title, description, subDescription, href, image, tags ,setPreview}) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
    
      <div className="flex-wrap items-center py-10 justify-between space-y-14 sm:-space-y-0" onMouseEnter={()=>setPreview(image)}
        onMouseLeave={()=>setPreview(null)}
        >
        <div>
          <p className="text-2xl">{title}</p>
          <div className=" flex gap-5 mt-2 text-shadow-emerald-800">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>

        <button onClick={()=> setIsHidden(true)}className="flex items-center gap-1  cursor-pointer hover:animation">
          Read More about
          <img src="assets/arrow-right.svg" className="w-5" />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
     { isHidden && (<ProjectDetails
        title={title}
        description={description}
        subDescription={subDescription}
        image={image}
        tags={tags}
        href={href}
        closeModal={()=>setIsHidden(false)}
      />)}
    </>
  );
};

export default Project;
