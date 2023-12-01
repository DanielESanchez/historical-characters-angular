import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { CharactersService } from "../../app/services/characters.service";
import { Character } from "../../app/interfaces/character";

describe("CharactersService", () => {
  let service: CharactersService;
  let httpTestingController: HttpTestingController;
  const mockChar: Character = {
    id: "b6e9e183-bc12-42af-a0ab-d769ebceedc6",
    name: "Jessie Gray",
    position: "In id dolore nisi ad proident sint ad culpa in consequat et.",
    country: "Vanuatu",
    description:
      "Ea ad esse dolore consectetur dolore ad ut culpa nisi sint excepteur irure ullamco et. Irure ex ad laborum id ut proident ex est. Laborum quis aute ipsum aliquip laboris dolor tempor. Excepteur tempor labore occaecat amet mollit tempor aliquip veniam id dolor sit ad cupidatat sint.\r\n",
    bornDate: "1392-07-08T06:31:08 +06:36",
  };
  const mockChar2: Character = {
    id: "3e2434fd-35c9-4a33-83d4-c7c31cf2176f",
    name: "Meyers Cohen",
    position:
      "Pariatur officia cillum eu nulla deserunt est id dolor non velit.",
    country: "French Polynesia",
    description:
      "Velit laborum culpa adipisicing cupidatat eu amet nisi dolore sit nostrud duis culpa. Anim adipisicing deserunt enim culpa pariatur ex ipsum est. Eiusmod voluptate cillum anim ad.\r\n",
    bornDate: "1865-07-27T07:13:22 +06:36",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService],
    });

    service = TestBed.inject(CharactersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get all characters", (done: DoneFn) => {
    const dummyCharacters: Character[] = [mockChar, mockChar2];

    service.getAllCharacters().then((characters) => {
      expect(characters).toEqual(dummyCharacters);
      done();
    });

    const req = httpTestingController.expectOne(
      "http://localhost:3159/characters?_sort=bornDate&_order=desc"
    );
    expect(req.request.method).toBe("GET");
    req.flush(dummyCharacters);
  });

  it("should get a character by ID", (done: DoneFn) => {
    const characterId = "1";

    service.getCharacterById(characterId).then((character) => {
      expect(character).toEqual(mockChar);
      done();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3159/characters/${characterId}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockChar);
  });

  it("should filter characters by name", (done: DoneFn) => {
    const searchTerm = "Character";
    const dummyFilteredCharacters: Character[] = [mockChar, mockChar2];

    service.filterCharacterByName(searchTerm).then((characters) => {
      expect(characters).toEqual(dummyFilteredCharacters);
      done();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3159/characters?name_like=${searchTerm}&_sort=bornDate&_order=desc`
    );
    expect(req.request.method).toBe("GET");
    req.flush(dummyFilteredCharacters);
  });

  it("should add a new character", (done: DoneFn) => {
    const newCharacter: Character = {
      id: "b9b9fdcf-91ea-472c-95eb-1091e11ddd5c",
      name: "Ernestine Ratliff",
      position:
        "Nulla enim proident quis minim reprehenderit cillum cillum nisi minim qui anim voluptate.",
      country: "Swaziland",
      description:
        "Eu velit minim reprehenderit esse tempor occaecat consequat anim consequat. Magna irure culpa eiusmod aute laboris culpa dolor minim amet. Aute nisi incididunt dolore voluptate eu in nisi dolor.\r\n",
      bornDate: "1207-08-06T08:39:27 +06:36",
    };

    service.addCharacter(newCharacter).then((characters) => {
      expect(characters).toEqual(true);
      done();
    });

    const req = httpTestingController.expectOne(
      "http://localhost:3159/characters"
    );
    expect(req.request.method).toBe("POST");
    req.flush({});
  });
});
