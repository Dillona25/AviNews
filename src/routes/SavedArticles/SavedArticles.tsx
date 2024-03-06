import { NewsCard } from "../../components/NewsCard/NewsCard";

export const SavedArticles = () => {
  return (
    <div className="bg-[#f5f6f7] w-full">
      {" "}
      <div className="max-w-[288px] m-auto">
        <div className="flex flex-col gap-3 py-[32px] items-center">
          {/* // Card compoennts will go here */}
          <NewsCard
            title="Everyone Needs a Special 'Sit Spot' in Nature"
            description=" Ever since I read Richard Louv's influential book, Last Child in the
            Woods, the idea of having a special sit spot has stuck with me.
            This advice, which Louv attributes to nature educator Jon Young, is
            for both adults and children to find..."
            keyword="Treehugger"
            date="November 4, 2020"
          />
          <NewsCard
            title="Nature makes you better"
            description="We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves."
            keyword="National Geographic"
            date="September 27, 2024"
          />
          <NewsCard
            title="Grand Teton Renews Historic Crest Trail"
            description="“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be..."
            keyword="Nation Parks Traveler"
            date="November 4, 2020"
          />
        </div>
      </div>
    </div>
  );
};
