import { Resolver, Query, Args } from '@nestjs/graphql';

export interface CMSEntity {
  offering: string;
  details: string[];
}

@Resolver('CMS')
export class CMSResolver {
  private cmses: CMSEntity[] = [
    {
      offering: 'vpn',
      details: ['detail 1', 'detail 2', 'detail 3'],
    },
    {
      offering: 'relay',
      details: ['relay 1', 'relay 2', 'relay 3'],
    },
  ];

  @Query('singleCMS')
  getSingleCart(@Args('offering') offering: string): CMSEntity {
    const cms = this.cmses.find((cms) => cms.offering === offering);

    if (!cms) throw new Error(`Could not find cms for offering: ${offering}`);

    return cms;
  }
}
