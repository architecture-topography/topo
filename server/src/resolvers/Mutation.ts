/*
 * Copyright 2018-2020 Thoughtworks Inc. All rights reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IBaseNode, IContext, IPlatform, ISystem } from '../types';

const Mutation = {
  createBox: async (
    _parent: IPlatform,
    args: {
      name: string;
      id: string;
      boxType: string;
      parentId: string;
      systems: string[];
    },
    context: IContext
  ) => {
    const box = await context.queries.createBox(
      args.id,
      args.boxType,
      args.name
    );
    if (args.parentId) {
      await context.queries.createLine(args.parentId, args.id);
    }
    if (args.systems) {
      const links = args.systems.map(systemId =>
        context.queries.createLine(args.id, systemId)
      );
      await Promise.all(links); // wait for all links to be created
    }
    return box;
  },

  createTechnology: (
    _parent: IBaseNode,
    args: { name: string; id: string },
    context: IContext
  ) => {
    return context.queries.createTechnology(args.id, args.name);
  },

  createSystem: async (
    _parent: ISystem,
    args: {
      name: string;
      id: string;
      parentBoxId: string;
      technologies: string[];
    },
    context: IContext
  ) => {
    const system = await context.queries.createSystem(
      args.id,
      args.name,
      args.parentBoxId
    );

    if (args.parentBoxId) {
      await context.queries.createLine(args.parentBoxId, args.id);
    }

    if (args.technologies) {
      const links = args.technologies.map(technologyId =>
        context.queries.createLine(args.id, technologyId)
      );
      await Promise.all(links); // wait for all links to be created
    }
    return system;
  },

  deleteAll: async (_parent: ISystem, _args: any, context: IContext) => {
    try {
      await context.queries.deleteAll();
      return { result: true };
    } catch (err) {
      return { result: false };
    }
  },
};

export default Mutation;
