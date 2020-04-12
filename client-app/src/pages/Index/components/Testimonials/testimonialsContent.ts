import musk from '../../../../assets/index/testimonials/musk.jpg';
import ma from '../../../../assets/index/testimonials/ma.jpg';
import bezos from '../../../../assets/index/testimonials/bezos.jpg';
import zuckerberg from '../../../../assets/index/testimonials/zuckerberg.jpg';
import gates from '../../../../assets/index/testimonials/gates.jpg';
import raibert from '../../../../assets/index/testimonials/raibert.jpg';

export type Review = {
  title: string;
  text: string;
  photo: string;
};

export const reviews: Review[] = [
  {
    title: 'Elon Musk, SpaceX & Tesla CEO',
    text: 'Artificial intelligence will bypass the capabilities of people, this is obvious. Now we, as children in a sandbox, do not pay attention to it. If we create an AI that solves this problem for us, the future of humanity will be saved.',
    photo: musk,
  },
  {
    title: 'Jack Ma, Alibaba Group co-founder',
    text: 'At the moment, the cost of transportation in the world is still quite high, I hope that the guys from Shuttle and Shuttle Research will cope with the task and make the service available to anyone anywhere in the world.',
    photo: ma,
  },
  {
    title: 'Marc Raibert, Boston Dynamics founder & CEO',
    text: 'This is just awesome! The shipment of components is lightning fast, our office in Berlin was amazed at the quality of workmanship. Shuttle services are unrivaled. Oh yes, there you can still talk with robots!',
    photo: raibert,
  },
  {
    title: 'Jeff Bezos, Amazon founder & CEO',
    text: 'I will pay tribute to the founders of Shuttle - they were able to almost impossible. With the integration of these technologies in the Amazon Store, we can significantly reduce the cost of shipping, which will open new markets for us. And Shuttle Research is the greatest genius of our time.',
    photo: bezos,
  },
  {
    title: 'Bill Gates, Microsoft co-founder',
    text: 'The world has long needed a breakthrough, but who would have thought that he would make such a big leap forward. The delivery problem alone prompted humanity to create what was considered unthinkable 20 years ago. This is the future, and it is already here.',
    photo: gates,
  },
  {
    title: 'Mark Zuckerberg, Facebook founder & CEO',
    text: 'Delivery should include a set of measures related to the safety of the goods. The exclusion of the human factor in the links of the production process has reduced the likelihood of disputable or destructive consequences. Shuttle is an example to learn from.',
    photo: zuckerberg,
  }
];