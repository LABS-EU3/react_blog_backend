exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("articles")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("articles").insert([
        {
          id: 1,
          coverImageUrl:
            "https://images.unsplash.com/photo-1440985465094-6ac443aab454?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          custom_id: 12,
          title: "It is a Long Established Fact that You Are Distracted.",
          authorId: 1,
          body:
            '[{"type":"paragraph","data":{"text":"In 2020, it seems almost pointless to bemoan the pervasiveness of technology. Yes, we love our cell phones and our tablets, and there are more than enough reasons that extend beyond mere convenience. There is just too much value in the ability to connect via our devices to ever make us revert back to the days before our first brick of a flip phone."}}, {"type":"paragraph","data":{"text":"At the same time, those of us who are deeply invested in life online—whether we remain connected to social media for our daily work or rely on the internet to keep ourselves informed politically—know what it feels like to live at least a portion of our day from notification to notification. And that life can get very noisy very quickly."}}, {"type":"paragraph","data":{"text":"With the help of creative agency Joint and RSA Films, global cinema operator Vue wants to help those of us glued to our screens “Get Lost” with its first-ever brand film."}}]',    
          createdAt: "2019-12-12",
          updatedAt: "2019-12-12",
          isEditing: false,
          isPublished: true
        },
        {
          id: 2,
          coverImageUrl:
            "https://images.unsplash.com/photo-1506645292803-579c17d4ba6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          custom_id: 12,
          title: "10 modern ways to make money online.",
          authorId: 1,
          body:
            '[{"type":"paragraph","data":{"text":"The internet has transformed the way we do business. It has opened up borders and removed limitations on what you can do and achieve based geographical regions or financial resources. With a computer, an internet connection, and personal drive, there is little that can stand in the way of you making an income online."}}, {"type":"paragraph","data":{"text":"From online surveys to renting out your house, there is no shortage of clever ways to make an online income."}}, {"type":"paragraph","data":{"text":"Please note it takes patience, persistence, failures, and hard work to build a successful online venture. There are no get-rich-quick schemes. Most quick ways to an online income are shortcuts that do not last or pan out to be scams. You have to put in time, effort, blood, sweat, and tears to be successful."}}]',    
          createdAt: "2019-12-12",
          updatedAt: "2019-12-12",
          isEditing: false,
          isPublished: true
        },
        {
          id: 3,
          custom_id: 12,
          coverImageUrl:
            "https://images.unsplash.com/photo-1490971588422-52f6262a237a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          title: "Record revenues at Web Summit as $2m investment agreed in Amaranthine",
          authorId: 1,
          body:
            '[{"type":"paragraph","data":{"text":"Pretax profits at the group that operates the Web Summit declined sharply last year as the company agreed a deal to invest $2 million into Amaranthine Partners, a US-headquartered multi-million dollar venture capital firm."}}, {"type":"paragraph","data":{"text":"Newly filed accounts for Manders Terrace Ltd, the holding company behind the Web Summit and its various sister events, show pretax profits fell from a record €3.8 million in 2017 to just €125,823 last year."}}, {"type":"paragraph","data":{"text":"The decline came as the company said it had entered into an agreement to put $2 million (€1.79 million) into Amaranthine, a $50 million tech-focused venture capital firm with an initial $500,000 invested last year. The last instalment is due in the first quarter of 2021."}}]',        
          createdAt: "2019-12-12",
          updatedAt: "2019-12-12",
          isEditing: false,
          isPublished: true
        },
        {
          id: 6,
          coverImageUrl:
            "https://images.unsplash.com/photo-1486649961855-75838619c131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          custom_id: 12,
          title: "The first Apple watch was indispensable. Nothing’s changed.",
          authorId: 1,
          body:
            '[{"type":"paragraph","data":{"text":"Before I tell you how much I love the latest Apple Watch, here’s a bit of background: I like analog wristwatches. Before I got my first Apple Watch, I enjoyed wearing different timepieces for different occasions, and collected more than a dozen of them over the years. I just didn’t think I’d be happy having to wear the same timepiece every day."}}, {"type":"paragraph","data":{"text":"I was very wrong. I have not worn a mechanical watch since I got my first Apple Watch in 2015."}}]',
          createdAt: "2019-12-12",
          updatedAt: "2019-12-12",
          isEditing: false,
          isPublished: true
        },
        {
          id: 5,
          coverImageUrl:
            "https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          custom_id: 12,
          title: "How To Fetch Data From an API With React Hooks",
          authorId: 1,
          body:
            '[{"type":"paragraph","data":{"text":"React Hooks let us write pure functional components without ever using the class syntax. Usually, but not always, the less code we have to write, the faster were building our application. If your new to Hooks, check out this tutorial for an introduction"}}]',
          createdAt: "2019-12-12",
          updatedAt: "2019-12-12",
          isEditing: false,
          isPublished: true
        },
        {
          id: 4,
          custom_id: 12,
          coverImageUrl: "https://www.irishtimes.com/polopoly_fs/1.4135082.1579124216!/image/image.jpg_gen/derivatives/box_220/image.jpg",
          title: "Make reclaiming your online privacy a priority in 2020.",
          authorId: 1,
          body:
            '[{"type":"paragraph","data":{"text":"Let 2020 be the year you reclaim your online privacy. Stop third party advertisers dead in their tracks as they attempt to follow your every move online."}}, {"type":"paragraph","data":{"text":"You don’t even need to ditch your favourites – with the right tools you can continue to use Google Search or YouTube while saying no to being surveilled."}}, {"type":"paragraph","data":{"text":"The crucial thing to be aware of is that every time you visit a website, what you see is not what you get. The code that goes into making a website has several purposes: on the surface, it loads the content you can see in front of you but in the background it runs scripts and loads trackers from external sources including third party AdTech companies."}}, {"type":"paragraph","data":{"text":"If you feel like a past web search or purchase is following you around the web in the form of ads popping up everywhere from Facebook to your favourite news sites, this is because they are thanks to these trackers."}}, {"type":"paragraph","data":{"text":"And should there be an opt-out (some third parties offer this) it usually means you are opting out from being shown targeted/personalised ads but not being offered the chance to opt out of your online behaviour being tracked."}}]',    
          createdAt: "2019-12-12",
          updatedAt: "2019-12-12",
          isEditing: false,
          isPublished: true
        },
        {
          id: 7,
          custom_id: 12,
          title: "Test 7",
          authorId: 1,
          body:
            '[{"type":"paragraph","data":{"text":"Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla."}}, {"type":"paragraph","data":{"text":"Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla."}}, {"type":"paragraph","data":{"text":"Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla."}}]',    
          createdAt: "2019-12-12",
          updatedAt: "2019-12-12",
          isEditing: false,
          isPublished: true
        }
      ]);
    });
};