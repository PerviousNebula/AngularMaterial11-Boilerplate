import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => service = new SidebarService());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#toggle should invert open property value', () => {
    const oldOpenValue = service.open;
    service.toggle();
    expect(service.open).not.toBe(oldOpenValue);
  });

});
